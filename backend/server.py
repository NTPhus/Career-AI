from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import os
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ==============================================================================
# PHẦN 1: TẢI TẤT CẢ CÁC MÔ HÌNH VÀ TÀI NGUYÊN KHI SERVER KHỞI ĐỘNG
# ==============================================================================
print("--- Đang tải các mô hình... ---")

# --- 1.1: Tải các tài nguyên của mô hình Cấp 1 ---
try:
    parent_model = joblib.load('parent_model_tuned.pkl')
    parent_encoder = joblib.load('parent_encoder.pkl')
    feature_columns = joblib.load('feature_columns.pkl')
    print("-> Tải mô hình Cấp 1 thành công.")
except Exception as e:
    print(f"LỖI: Không thể tải mô hình Cấp 1. Lỗi: {e}")
    parent_model = None # Đánh dấu là có lỗi

# --- 1.2: Tải tất cả các mô hình con Cấp 2 ---
child_models = {}
child_encoders = {}
child_model_dir = "child_models_tuned" # Thư mục chứa các mô hình con

# Lấy danh sách các lĩnh vực từ encoder của mô hình cha
if parent_encoder:
    for field_name in parent_encoder.classes_:
        safe_field_name = re.sub(r'[^a-zA-Z0-9_]', '', field_name.replace(' ', '_').replace('&', 'and'))
        model_path = os.path.join(child_model_dir, f'child_model_{safe_field_name}.pkl')
        encoder_path = os.path.join(child_model_dir, f'child_encoder_{safe_field_name}.pkl')
        
        if os.path.exists(model_path) and os.path.exists(encoder_path):
            child_models[field_name] = joblib.load(model_path)
            child_encoders[field_name] = joblib.load(encoder_path)
    print(f"-> Tải thành công {len(child_models)} mô hình Cấp 2.")
else:
    print("LỖI: Không thể tải các mô hình Cấp 2 vì parent_encoder không tồn tại.")

print("--- Quá trình tải mô hình hoàn tất. Server sẵn sàng. ---")


# ==============================================================================
# PHẦN 2: CÁC HÀM HỖ TRỢ
# ==============================================================================

def preprocess_input(raw_data, columns_schema):
    """
    Chuẩn bị dữ liệu đầu vào từ người dùng.
    - Chuyển thành DataFrame.
    - Xử lý các đặc trưng RIASEC, TIPI.
    - Mã hóa one-hot các biến phân loại.
    - Sắp xếp lại cột để khớp với lúc huấn luyện.
    """
    if isinstance(raw_data, list):
        df_raw = pd.DataFrame(raw_data)
    else:
        df_raw = pd.DataFrame([raw_data])

    # --- Feature Engineering ---
    # (Copy lại chính xác các bước tạo đặc trưng bạn đã dùng khi huấn luyện)
    for t in ['R', 'I', 'A', 'S', 'E', 'C']:
        df_raw[f'{t}_mean'] = df_raw[[f'{t}{i}' for i in range(1, 9)]].mean(axis=1)
    
    df_raw['TIPI_Extraversion'] = (df_raw['TIPI1'] + (8 - df_raw['TIPI6'])) / 2
    df_raw['TIPI_Agreeableness'] = ((8 - df_raw['TIPI2']) + df_raw['TIPI7']) / 2
    df_raw['TIPI_Conscientiousness'] = (df_raw['TIPI3'] + (8 - df_raw['TIPI8'])) / 2
    df_raw['TIPI_Neuroticism'] = ((8 - df_raw['TIPI4']) + df_raw['TIPI9']) / 2
    df_raw['TIPI_Openness'] = (df_raw['TIPI5'] + (8 - df_raw['TIPI10'])) / 2
    
    mean_cols = [f'{t}_mean' for t in ['R', 'I', 'A', 'S', 'E', 'C']]
    df_raw['score_range'] = df_raw[mean_cols].max(axis=1) - df_raw[mean_cols].min(axis=1)
    df_raw['score_std'] = df_raw[mean_cols].std(axis=1)

    df_sorted_codes = df_raw[mean_cols].apply(lambda x: x.sort_values(ascending=False).index.str[0], axis=1)
    df_raw['top_1_code'] = df_sorted_codes.str[0]
    df_raw['top_2_code'] = df_sorted_codes.str[1]
    df_raw['top_3_code'] = df_sorted_codes.str[2]
    
    # One-hot encoding
    # Lưu ý: 'gender' và 'urban' cần được xử lý để đảm bảo tất cả các cột có thể xuất hiện
    # Ví dụ đơn giản, nếu bạn gửi lên gender=1, gender=2
    df_raw['gender'] = df_raw['gender'].astype('category')
    df_raw['urban'] = df_raw['urban'].astype('category')
    df_encoded = pd.get_dummies(df_raw, columns=['gender', 'urban', 'top_1_code', 'top_2_code', 'top_3_code'], drop_first=True)

    # Sắp xếp lại và điền các cột bị thiếu
    processed_df = df_encoded.reindex(columns=columns_schema, fill_value=0)
    
    return processed_df

# ==============================================================================
# PHẦN 3: API ENDPOINT
# ==============================================================================

@app.route("/predict", methods=["POST"])
def predict():
    # Kiểm tra xem các mô hình đã được tải thành công chưa
    if not parent_model or not feature_columns:
        return jsonify({"error": "Mô hình chưa được tải hoặc bị lỗi. Vui lòng kiểm tra log của server."}), 500

    try:
        # --- 1. Nhận và tiền xử lý dữ liệu ---
        raw_data = request.json
        user_df = preprocess_input(raw_data, feature_columns)

        # Hỗ trợ dự đoán cho nhiều người dùng cùng lúc
        all_users_recommendations = []
        for i in range(len(user_df)):
            single_user_df = user_df.iloc[[i]]

            # --- 2. Chạy mô hình cấp 1 ---
            field_probabilities = parent_model.predict_proba(single_user_df)[0]
            top_field_indices = np.argsort(field_probabilities)[-4:][::-1] # Lấy top 4 lĩnh vực

            # --- 3. Thu thập ứng cử viên từ mô hình cấp 2 ---
            all_candidate_majors = []
            for field_idx in top_field_indices:
                field_prob = field_probabilities[field_idx]
                field_name = parent_encoder.inverse_transform([field_idx])[0]
                
                if field_name in child_models:
                    child_model = child_models[field_name]
                    child_encoder = child_encoders[field_name]
                    
                    major_probabilities = child_model.predict_proba(single_user_df)[0]
                    # Lấy top 3 ngành trong lĩnh vực này
                    top_major_indices = np.argsort(major_probabilities)[-3:][::-1]
                    
                    for major_idx in top_major_indices:
                        major_prob = major_probabilities[major_idx]
                        major_name = child_encoder.inverse_transform([major_idx])[0]
                        
                        final_score = field_prob * major_prob
                        all_candidate_majors.append({
                            'major': major_name,
                            'score': float(final_score), # Chuyển thành float để serialize JSON
                            'field': field_name
                        })

            # --- 4. Sắp xếp và lấy top 3 gợi ý cuối cùng ---
            sorted_recommendations = sorted(all_candidate_majors, key=lambda x: x['score'], reverse=True)
            final_recommendations = sorted_recommendations[:3]
            all_users_recommendations.append(final_recommendations)

        # Nếu chỉ có 1 user, trả về list gợi ý. Nếu nhiều, trả về list của các list.
        response = all_users_recommendations[0] if len(all_users_recommendations) == 1 else all_users_recommendations
        
        return jsonify({"prediction": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==============================================================================
# PHẦN 4: KHỞI CHẠY SERVER
# ==============================================================================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False) # Tắt debug khi triển khai thực tế
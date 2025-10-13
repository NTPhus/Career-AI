from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

# ===== Load model & schema =====
model = joblib.load("rf_resources/rf_model.pkl")
model_columns = joblib.load("rf_resources/model_columns.pkl")  # list tên cột của X_train
label_encoder = joblib.load("rf_resources/label_encoder.pkl")  # LabelEncoder đã dùng lúc train

def raw_to_X_test(df_raw, X_columns):
    """
    Đưa df_raw về cùng schema như lúc train.
    - Nếu thiếu cột -> fill bằng 0
    - Nếu thừa cột -> loại bỏ
    - Đảm bảo đúng thứ tự
    """
    return df_raw.reindex(columns=X_columns, fill_value=0)

def predict_top5(model, label_encoder, X_test, top_n=5):
    proba = model.predict_proba(X_test)  # shape: (n_samples, n_classes)
    classes = model.classes_  # numeric labels (encoded)
    y_pred_top1 = model.predict(X_test)  

    top5_list = []
    for i in range(X_test.shape[0]):
        sorted_idx = np.argsort(-proba[i])
        top_indices = sorted_idx[:top_n]

        # đảm bảo top1 = predict()
        top_indices = np.insert(top_indices, 0, np.where(classes == y_pred_top1[i])[0][0])
        top_indices = np.unique(top_indices)[:top_n]

        # map về nhãn gốc
        top_labels = label_encoder['Ngành học'].inverse_transform(classes[top_indices])
        top5_list.append(top_labels.tolist())
    return top5_list

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Data từ Node.js gửi lên
        data = request.json
        if isinstance(data, list):
            df_raw = pd.DataFrame(data)
        else:
            df_raw = pd.DataFrame([data])

        # Chuẩn hóa dữ liệu
        X_test = raw_to_X_test(df_raw, model_columns)

        # Lấy top5 label
        top5_labels = predict_top5(model, label_encoder, X_test, top_n=5)

        return jsonify({"prediction": top5_labels})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

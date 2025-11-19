export function toNonAccentAndSlugify(str) {
    // Đảm bảo xử lý chuỗi và loại bỏ khoảng trắng dư thừa ở đầu/cuối
    let result = str.trim().toLowerCase();

    // 1. Chuẩn hóa chuỗi và loại bỏ dấu
    result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // 2. Thay thế dấu 'đ'/'Đ' bằng 'd'
    result = result.replace(/đ/g, 'd');

    // 3. Thay thế dấu cách bằng dấu gạch ngang (-)
    // Lưu ý: Chỉ thay thế dấu cách, không loại bỏ các ký tự đặc biệt khác nếu muốn giữ lại
    result = result.replace(/\s+/g, '-'); // Thay thế 1 hoặc nhiều dấu cách bằng 1 dấu gạch ngang

    // 4. (Tùy chọn) Loại bỏ các ký tự không an toàn cho URL (ví dụ: chỉ giữ lại chữ, số, và gạch ngang)
    result = result.replace(/[^a-z0-9-]/g, '');
    
    // 5. (Tùy chọn) Xử lý dấu gạch ngang dư thừa
    result = result.replace(/-+/g, '-');
    result = result.replace(/^-+|-+$/g, '');

    return result;
}
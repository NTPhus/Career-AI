export function getEmbedUrl(url) {
    if (!url || typeof url !== 'string') {
        return '';
    }
    
    // 1. Xử lý định dạng youtu.be (https://youtu.be/VIDEO_ID)
    if (url.includes('youtu.be')) {
        const videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // 2. Xử lý định dạng watch?v= (https://www.youtube.com/watch?v=VIDEO_ID)
    if (url.includes('watch?v=')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get('v');
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
    }
    
    // Nếu URL đã là định dạng embed, trả về nguyên trạng (hoặc URL rỗng nếu không phải)
    if (url.includes('/embed/')) {
        return url;
    }

    return ''; 
}
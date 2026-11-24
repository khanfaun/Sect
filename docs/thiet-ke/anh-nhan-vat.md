# Ảnh nhân vật ngồi thiền: cách tạo lại

Tài liệu cho phiên làm việc sau. Đọc hết trước khi sửa hay tạo ảnh nhân vật.

## 1. Trong game đang dùng gì

- **210 ảnh webp** ở `src/assets/nv/nv-*.webp`, 640px, chất lượng 88. `npm run build` chép sang `anh-nv/` cạnh `phu-sinh.html`. Ảnh nhân vật **không nhúng vào HTML**; `I()` ở `src/react/giao-dien/anh.js` trả đường dẫn `anh-nv/<tên>.webp`.
- **Tên ảnh**:
  - Thiếu niên và lão giả: `nv-<tuổi>-<áo>`.
  - Trung niên: `nv-middle-<áo>-<đen|bac>`.
  - Thanh niên: `nv-young-<áo>-<đen|bac>-<kiểu tóc>`.
- **Luật chọn ảnh** ở `src/game/core2/84-ngoai-hinh.js`, hàm `ngoaiHinh()`:
  - **Độ tuổi**:
    - Phàm nhân, hoặc chưa đủ 20 tuổi: chọn theo tuổi thật.
    - Tu sĩ: chọn theo % thọ nguyên, bảng `NH_MOC`.
    - Đã uống Trú Nhan Đan (`r.truNhan`): giữ nguyên độ tuổi lúc uống (luật ở core2/90-tru-nhan.js).
    - Dev test ép hình (`r.devNh`): dùng độ tuổi được ép.
  - **Áo**:
    - Phàm nhân: 7 áo theo xuất thân (`AO_KIEU`, `AO_XT`).
    - Tu sĩ: chỉ mặc áo của **cảnh giới hiện tại** (`AO_CG`).
  - **Số bộ áo cảnh giới**: Luyện Khí 3, Trúc Cơ 3, Kết Đan 3, Nguyên Anh 4, Hóa Thần 8 (đã bỏ ht7), Độ Kiếp 7 (đã bỏ dk1, dk4). Cộng 7 áo phàm nhân là 35 bộ.
  - **Kiểu tóc thanh niên** theo cảnh giới:

    | Cảnh giới | Kiểu tóc | Mã |
    |---|---|---|
    | Phàm nhân, Luyện Khí | Buộc đuôi ngựa | `duoi` |
    | Trúc Cơ, Kết Đan | Búi, đội mũ bạc | `bui` |
    | Nguyên Anh | Xoã thẳng | `xoa` |
    | Hóa Thần | Xoã, tóc mái ôm mặt | `mai` |
    | Độ Kiếp | Xoã gợn sóng | `song` |

  - **Màu tóc** (đen hoặc bạc) do người chơi chọn, dùng cho thanh niên và trung niên.
- **Bài kiểm tra**:
  - `node tools/test.js ngoai_hinh tru_nhan`: phải có đủ 210 ảnh.
  - Giao diện: `giao_dien_moi`, `may_tinh`, `pc_anh`.

## 2. Hiển thị (CSS)

- `NhanVatThien.jsx` vẽ **một ảnh đứng yên** (`.nvk > img.ost`), cộng hạt châu (`.hal`, `.glw`, `.hco`). Lớp vạt áo đung đưa (`.ofl`/`.ofr`) và lớp thở ngực (`.och`) **đã bỏ**: ảnh bản sao lệch mép làm lộ vệt bầu dục. Đừng thêm lại kiểu đè ảnh bản sao có mặt nạ.
- Ảnh có lề: nhân vật chiếm 84% khung để vạt áo không bị cắt. `.nvk` phóng lại `scale(1.1905)`.
- Khung `.tb-giua` / `.dev-nv-xem` có viền vẽ đè bằng `::after` để che phần áo chạm mép.

## 3. Công cụ tạo ảnh: `tools/nv-comfy.py`

- Cần ComfyUI chạy ở `127.0.0.1:8000`. Máy này dùng bản ComfyUI Desktop, thư mục dữ liệu `C:\Users\My-PC\Downloads\New folder (3)`.
- **Mô hình: Qwen Image 2.1 Turbo, chế độ sửa ảnh.** Hàm `wf()` dựng sẵn quy trình:

  | Thành phần | Thiết lập |
  |---|---|
  | Mô hình | `qwen_image_2.1_turbo_int8_convrot.safetensors` |
  | Bộ mã hoá chữ | `qwen3vl_8b_int8_convrot.safetensors` |
  | VAE | `qwen_image_2.1_vae_bf16.safetensors` |
  | Mã hoá câu lệnh | `TextEncodeQwenImage21`, nhận `image_1` và `image_2` |
  | Bộ lấy mẫu | euler, cfg 1, 8 bước |

  Câu lệnh có ghi "transparent background, output a PNG" thì ra thẳng PNG trong suốt.
- **Đầu vào** đã lưu trong git, ở `src/assets-goc/nv/`:
  - Thân gốc: `than-teen.png`, `than-young.png`, `than-middle.png`, `than-elder.png`. Đã có lề, chưa có tay, mặt và tóc đã chốt.
  - `lop-tay.png`: lớp hai bàn tay đặt lên gối, ngửa lòng, ngón cái chạm ngón giữa.
  - `toc-bac-9-7.png`: bảng kiểu tóc. Ô dùng: `duoi` (0,2), `bui` (1,1), `xoa` (0,0), `mai` (1,0), `song` (2,0), ghi trong `O5`.
  - Bảng áo 3×3: `ao-cg-<cảnh giới>.png`, `ao-cg2-hoathan.png`, `ao-cg2-dokiep.png`. Vị trí từng áo ghi trong `CG`, lời tả trong `CG_TXT`.
  - `than-hoan-9-3.png`: 9 mẫu thần hoàn (vòng sau lưng) cho tính năng sau, chưa dùng.
- **Lệnh chính:**
  - `python tools/nv-comfy.py cg [id ...]` tạo trọn bộ cho từng áo. Không ghi id thì làm cả 35 bộ, mất khoảng 3 tiếng.
  - Thêm `--lai` để bỏ bước thay áo, dùng lại ảnh `<tuổi>-<áo>.png` đã có.
  - `python tools/nv-comfy.py cat` đổi mọi `khop/*.png` sang webp ở `src/assets/nv/`. Lệnh này chỉ ghi đè ảnh trùng tên, không xoá ảnh thừa.
- **Các bước của `cg`**: mỗi ảnh chỉ qua **2 lượt vẽ**. Mỗi lượt Qwen vẽ lại cả bức, nên càng nhiều lượt hoa văn càng vụn và sần.
  1. **Thay áo** trên `than-<tuổi>.png`, ra `<tuổi>-<áo>.png`. Ảnh 2 là ô áo cắt từ bảng; áo phàm nhân chỉ tả bằng chữ. Câu lệnh "Completely REPLACE the clothes…", bắt vạt áo nằm gọn trong khung, cấm vẽ tay.
  2. **Gộp một lượt**: dán `lop-tay.png` lên ảnh bước 1, Qwen sửa miệng ống tay áo ôm cổ tay, ra `khop/…`.
     - Thiếu niên, lão giả, trung niên tóc đen: chỉ khớp tay.
     - Thanh niên: khớp tay **và** đổi kiểu tóc theo cảnh giới. Ảnh 2 là ô tóc. Tóc đen và tóc bạc mỗi màu làm riêng từ cùng ảnh, **không nhuộm từ ảnh tóc bạc**.
     - Trung niên tóc bạc: khớp tay **và** đổi màu tóc (`BAC_TN`).
- **Ảnh ra còn nền trắng** thì `chay()` tự vẽ lại cả ảnh với hạt giống khác, tối đa 3 lần. Không dùng bước tách nền riêng.
- **Chỉnh riêng một bộ**: thêm vào `THEM_AO = {id: (câu thêm, hạt giống)}`.
  - `EO`: giữ eo, thân đầy đặn. Dùng cho dk6, dk8, dk9.
  - `KHONG_TAY`: cấm vẽ tay trên đùi. Dùng cho khach, ma; trước đây hai bộ này ra 4 bàn tay.
- `KHONG_REF`: những bộ chỉ tả bằng chữ, không dùng ảnh mẫu. Hiện để trống.

## 4. Quy trình làm lại một bộ áo

1. Chạy `python tools/nv-comfy.py cg <id>`. Có ảnh thay áo tốt rồi thì thêm `--lai`.
2. Soát ảnh trên nền xám:
   - Đúng 2 bàn tay. Cắt dải 55–80% chiều cao ảnh để xem cho nhanh.
   - Vạt áo không chạm mép trái/phải.
   - Nền trong suốt: alpha nhỏ nhất bằng 0.
   - Eo không thon quá.
   - Mịn, không sần. Phóng to vùng ngực để xem.
3. Chạy `python tools/nv-comfy.py cat`, rồi `npm run build`.
4. Chạy `node tools/test.js ngoai_hinh tru_nhan` và các bài giao diện kể ở mục 1.
5. Kiểm tra đạt thì commit, đẩy lên `main`.

**Thêm bộ áo mới cho cảnh giới:**
- Thêm id vào `AO_CG` (84-ngoai-hinh.js), `CG` và `CG_TXT` (nv-comfy.py).
- Sửa số ảnh trong bài `ngoai_hinh` (`AO_CG.map(x=>x.length)` và tổng số ảnh).

## 5. Lưu ý

- PNG 1024px trung gian (`khop/`, `<tuổi>-<áo>.png`) **không lưu trong git**, chỉ để trên máy, và `.gitignore` đã chặn. Muốn sửa một bộ mà mất ảnh trung gian thì chạy lại `cg <id>` đầy đủ.
- Đừng dùng ảnh mẫu là hình của game khác hay phim khác làm ảnh 2: Qwen chép theo hình dáng mẫu. Bảng áo đã được vẽ lại thành mẫu riêng.
- Chỉ làm nhân vật nam. Nữ (`r.g==='nu'`) vẫn dùng ảnh `de-tu-1` tạm.
- Thần hoàn (vòng sau lưng, Kết Đan trở lên, người chơi bật/tắt được) chưa làm. Mẫu ở `than-hoan-9-3.png`.

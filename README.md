# 🎯 Báo Cáo Thuyết Trình Đề Tài MedSched Pro v1.5.0
> **Hệ Thống Đặt Lịch Khám Bệnh Trực Tuyến & Quản Trị Y Tế Thông Minh**  
> **Khoa Công Nghệ Thông Tin — Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC)**  
> **Lớp:** CD25CT_CLC · **Nhóm:** 02 · **GVHD:** Thầy Trương Thanh Bình

---

## 📂 Cấu Trúc Thư Mục Chuyên Nghiệp (Clean Architecture)

```text
04_Bai_Thuyet_Trinh/
├── b_Slide/
│   ├── index.html          # File HTML trình diễn slide chính (Chuẩn semantic, siêu nhẹ)
│   ├── css/
│   │   └── style.css       # Toàn bộ CSS giao diện, animations, typography & responsive
│   ├── js/
│   │   └── script.js       # Logic điều khiển slide, phím tắt, full screen, bộ đếm & hiệu ứng
│   ├── img/                # Thư mục hình ảnh, logo ITC/MedSched, avatar thành viên & sơ đồ
│   ├── video/              # Video demo giao diện thực tế (Laptop & Mobile PWA)
└── README.md               # Tài liệu tổng quan và hướng dẫn vận hành
```

---

## 🚀 Hướng Dẫn Khởi Chạy Slide

1. Mở dự án trong Visual Studio Code.
2. Cài đặt tiện ích **Live Server**.
3. Chuột phải vào `04_Bai_Thuyet_Trinh/b_Slide/index.html` và chọn **Open with Live Server** (hoặc truy cập `http://127.0.0.1:5500/08_TaiLieuTongHop/04_Bai_Thuyet_Trinh/b_Slide/index.html`).
4. Sử dụng các phím điều hướng:
   - **Mũi tên Phải (→) / Space / Page Down:** Chuyển sang slide kế tiếp.
   - **Mũi tên Trái (←) / Page Up:** Quay lại slide trước.
   - **Phím F / Nút phóng to:** Bật/tắt chế độ toàn màn hình (Fullscreen Presentation).
   - **Phím Home / End:** Về slide đầu / slide cuối.

---

## 👥 Danh Sách Đội Ngũ Thực Hiện (Nhóm 02)

| STT | Họ và Tên | MSSV | Vai Trò & Phân Công Nhiệm Vụ |
| :---: | :--- | :---: | :--- |
| **01** | **Châu Tuấn Kiệt** | 506250495 | **Trưởng Nhóm / Architect:** Kiến trúc Hexagonal, lõi Atomic CAS, Spring AI, API Gateway, Quản lý tiến độ |
| **02** | **Nguyễn Thị Yến Nhi** | 501250145 | **Database Designer & Backend:** CSDL 23 bảng 3NF, DBeaver ERD, Quản lý Danh mục & Bệnh án EHR |
| **03** | **Lê Thành Tài** | 501250471 | **Security & Backend Engineer:** Spring Security 6, JWT 1 phiên (`revoked_tokens`), Phân quyền 4 Roles RBAC |
| **04** | **Nguyễn Văn Hiệu** | 501250367 | **Frontend Lead:** Next.js 15 App Router, React 19, Tailwind v4, PWA, Cổng bệnh nhân & Bác sĩ |
| **05** | **Huỳnh Thị Kim Trang** | 501250114 | **Frontend & UI/UX:** Kiosk QR Tiếp đón <1s, Giao diện Thu ngân VietQR, Báo cáo & Tài liệu |
| **06** | **Trần Nhật Tân** | 501250392 | **AI Engineer & QA:** Tích hợp Gemini 2.5 Flash Triage, Test-Driven Development, Kịch bản Live Demo |

---

## 🌟 Trọng Tâm Kỹ Thuật Đồ Án
- **Kiến trúc Lục giác (Hexagonal Architecture):** 0% Spring Framework tại Core Domain (Pure Java 21).
- **Giải thuật Concurrency Atomic CAS:** Triệt tiêu hoàn toàn Race Condition khi hàng trăm bệnh nhân cùng đặt một khung giờ khám.
- **Cơ sở dữ liệu Chuẩn 3NF:** 23 bảng quan hệ chặt chẽ, B-Tree Composite Index tối ưu truy vấn thời gian thực.
- **Trí tuệ nhân tạo Spring AI (Gemini 2.5 Flash):** Phân luồng triệu chứng tự nhiên, gợi ý chuyên khoa chính xác.
- **Giám sát thời gian thực Prometheus & Grafana (SRE Observability):** Cào metrics 5s/lần qua Spring Boot Actuator, hiển thị trực quan RPS, HikariCP pool, CPU/RAM trên Dashboard Docker độc lập.
- **Quy trình Git Flow 6 Người:** Nhánh trung tâm `develop`, bảo vệ nhánh `main`, tuân thủ nghiêm ngặt chỉ dẫn của Thầy Bình.

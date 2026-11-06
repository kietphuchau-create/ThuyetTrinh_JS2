# KỊCH BẢN THUYẾT TRÌNH MEDSCHED TRONG 5 PHÚT

**Tổng thời lượng:** khoảng 5 phút  
**Cách nói:** rõ ràng, tốc độ vừa phải, không đọc toàn bộ chữ trên slide  
**Lưu ý:** Khi chuyển slide, dừng khoảng 1 giây và nhìn về phía Hội đồng.

---

## Slide 1 — Giới thiệu đề tài (0:00–0:30)

**Lời nói:**

“Kính thưa Thầy và Hội đồng, nhóm em xin trình bày đồ án tốt nghiệp **MedSched – Hệ thống đặt lịch khám bệnh thông minh**.

Đề tài xuất phát từ tình trạng bệnh nhân phải chờ lâu, còn phòng khám gặp khó khăn khi sắp xếp lịch và điều phối người bệnh. MedSched giúp bệnh nhân chủ động chọn lịch khám, đồng thời hỗ trợ phòng khám quản lý toàn bộ quy trình từ tiếp đón đến hoàn tất ca khám.”

**Chuyển ý:** “Trước tiên, em xin giới thiệu các đối tượng sử dụng chính của hệ thống.”

---

## Slide 2 — Bốn vai trò cốt lõi (0:30–1:00)

**Lời nói:**

“Hệ thống phục vụ bốn vai trò chính.

Bệnh nhân có thể đặt lịch, nhận mã QR và xem lại hồ sơ khám. Lễ tân dùng mã QR hoặc CCCD để tiếp nhận và cấp số thứ tự. Bác sĩ quản lý hàng đợi, lập bệnh án và kê đơn điện tử. Quản trị viên chịu trách nhiệm phân quyền, cấu hình phòng khám và theo dõi báo cáo.

Mỗi vai trò có giao diện và quyền truy cập riêng theo cơ chế RBAC.”

**Chuyển ý:** “Bốn vai trò này phối hợp với nhau trong một quy trình khám khép kín.”

---

## Slide 3 — Quy trình một ca khám (1:00–1:35)

**Lời nói:**

“Một ca khám gồm bốn giai đoạn.

Đầu tiên, bệnh nhân chọn chuyên khoa, bác sĩ và khung giờ. Hệ thống tạo lịch hẹn cùng mã QR. Khi đến phòng khám, lễ tân quét mã, xác nhận thông tin và cấp số thứ tự. Tiếp theo, bác sĩ gọi bệnh nhân, ghi nhận kết quả khám và kê đơn. Cuối cùng, hệ thống tổng hợp viện phí, hỗ trợ thanh toán tiền mặt hoặc VietQR và hoàn tất ca khám.

Trạng thái của lịch được cập nhật xuyên suốt từ **Booked**, **Checked-in**, **In progress** đến **Completed**.”

**Chuyển ý:** “Để vận hành quy trình này ổn định, nhóm xây dựng kiến trúc hệ thống theo các lớp rõ ràng.”

---

## Slide 4 — Kiến trúc tổng thể (1:35–2:05)

**Lời nói:**

“Ở phía người dùng, MedSched hỗ trợ nhiều vai trò thông qua giao diện Next.js dạng PWA, sử dụng được trên máy tính và điện thoại.

Các yêu cầu đi qua Spring Security để xác thực JWT và kiểm tra quyền truy cập, sau đó được xử lý tại backend Spring Boot. Phần nghiệp vụ chính nằm trong Hexagonal Domain. Hệ thống lưu dữ liệu bằng MySQL, tích hợp VietQR và PayOS cho thanh toán, Gemini cho phân khoa ban đầu, đồng thời kết nối Prometheus và Grafana để giám sát.”

**Chuyển ý:** “Điểm đáng chú ý trong kiến trúc này là phần lõi nghiệp vụ được tách độc lập.”

---

## Slide 5 — Kiến trúc Hexagonal (2:05–2:30)

**Lời nói:**

“Nhóm áp dụng kiến trúc Hexagonal, còn gọi là Ports and Adapters.

Ở trung tâm là Core Domain chứa các thực thể và quy tắc nghiệp vụ y tế. Phía vào tiếp nhận yêu cầu từ giao diện web và quầy lễ tân. Phía ra kết nối cơ sở dữ liệu, thanh toán và các dịch vụ thông báo.

Cách tổ chức này giúp nghiệp vụ ít phụ thuộc framework, dễ kiểm thử và thuận lợi khi thay đổi công nghệ bên ngoài.”

**Chuyển ý:** “Dữ liệu của toàn bộ quy trình được tổ chức trong cơ sở dữ liệu quan hệ.”

---

## Slide 6 — Cơ sở dữ liệu (2:30–2:50)

**Lời nói:**

“Cơ sở dữ liệu MySQL được chuẩn hóa đến 3NF, gồm 23 bảng và các ràng buộc khóa ngoại.

Các bảng được chia theo hai nhóm nghiệp vụ chính: khám chữa bệnh, gồm chuyên khoa, lịch khám và bệnh án; cùng nhóm quản trị vận hành, tập trung vào người dùng và phân quyền vai trò.

Thiết kế này hạn chế dữ liệu trùng lặp và bảo đảm tính liên kết của hồ sơ y tế.”

**Chuyển ý:** “Từ nền tảng đó, nhóm tập trung giải quyết hai bài toán kỹ thuật quan trọng.”

---

## Slide 7 — Chống đặt trùng lịch và hỗ trợ AI (2:50–3:25)

**Lời nói:**

“Bài toán thứ nhất là nhiều người cùng chọn một khung giờ. Nhóm sử dụng Atomic Compare-and-Set: hệ thống chỉ cập nhật slot khi trạng thái vẫn còn **Available**. Vì vậy, tại một thời điểm chỉ một yêu cầu đặt lịch thành công. Yêu cầu còn lại nhận mã 409 và được gợi ý khung giờ khác.

Nếu bệnh nhân chưa đặt cọc, tác vụ định kỳ sau 15 phút sẽ giải phóng slot.

Bài toán thứ hai là phân khoa. Spring AI kết hợp Gemini 2.5 Flash để đọc mô tả triệu chứng, gợi ý chuyên khoa phù hợp và tạo phần tóm tắt cho bác sĩ tham khảo.”

**Chuyển ý:** “Sau khi triển khai, hệ thống tiếp tục được theo dõi theo thời gian thực.”

---

## Slide 8 — Giám sát hệ thống (3:25–3:50)

**Lời nói:**

“Prometheus thu thập số liệu từ Spring Actuator mỗi 5 giây, còn Grafana trực quan hóa tình trạng hệ thống.

Nhóm theo dõi độ trễ, lưu lượng, lỗi, mức sử dụng CPU, bộ nhớ JVM và kết nối cơ sở dữ liệu. Trên dashboard hiện tại, CPU ở khoảng 19 phần trăm, JVM Heap khoảng 54,8 trên 256 MB và chưa ghi nhận rò rỉ kết nối. Hệ thống cũng có ngưỡng cảnh báo khi CPU hoặc bộ nhớ tăng cao.”

**Chuyển ý:** “Sau đây, nhóm xin trình diễn nhanh luồng sử dụng chính.”

---

## Slide 9 — Demo nhanh (3:50–4:30)

**Thao tác và lời nói:**

1. **Mở trang đặt lịch:** “Bệnh nhân chọn chuyên khoa, bác sĩ và khung giờ còn trống.”
2. **Xác nhận đặt lịch:** “Sau khi xác nhận, hệ thống tạo phiếu hẹn và mã QR.”
3. **Chuyển sang giao diện lễ tân:** “Lễ tân quét mã để check-in và cấp số thứ tự.”
4. **Mở giao diện bác sĩ:** “Bác sĩ gọi bệnh nhân, cập nhật bệnh án và kê đơn.”
5. **Kết thúc:** “Thông tin được chuyển sang bước thanh toán để hoàn tất ca khám.”

**Nếu demo gặp lỗi:**

“Do thời lượng có hạn, nhóm xin phép sử dụng video mô phỏng đã chuẩn bị. Video thể hiện cùng một quy trình từ đặt lịch, tiếp nhận đến xử lý ca khám.”

**Chuyển ý:** “Từ phần trình diễn trên, nhóm xin tổng kết kết quả của đề tài.”

---

## Slide 10 — Tổng kết và định hướng (4:30–5:00)

**Lời nói:**

“MedSched đã hoàn thiện quy trình khám bệnh khép kín, phân quyền rõ ràng cho bốn vai trò và xây dựng nền tảng dữ liệu có tính toàn vẹn. Hệ thống cũng xử lý được tình huống đặt lịch đồng thời, tích hợp hỗ trợ phân khoa bằng AI và có công cụ giám sát vận hành.

Trong thời gian tới, nhóm định hướng phát triển kiosk tự check-in, ứng dụng Flutter kết hợp nhắc lịch qua SMS hoặc Zalo, và chuẩn hóa API theo HL7/FHIR để có thể kết nối với các hệ thống HIS, LIS.

Phần trình bày của nhóm em đến đây là kết thúc. Nhóm em xin chân thành cảm ơn Thầy và Hội đồng đã lắng nghe, và xin sẵn sàng trả lời câu hỏi.”

---

## Mẹo giữ đúng 5 phút

- Bắt đầu bấm giờ ngay khi nói câu “Kính thưa Thầy và Hội đồng”.
- Không đọc nội dung chi tiết trên slide; chỉ nói đúng phần kịch bản.
- Nếu đến slide 7 mà đã quá 3 phút 25 giây, bỏ câu giải thích về mã 409 và tác vụ 15 phút.
- Nếu demo chậm, chỉ thực hiện ba bước: đặt lịch, nhận QR và check-in.
- Mục tiêu sang slide tổng kết trước mốc 4 phút 30 giây.

# KỊCH BẢN THUYẾT TRÌNH MEDSCHED TRONG 5 PHÚT

**Tổng thời lượng:** khoảng 5 phút  
**Cách nói:** rõ ràng, tốc độ vừa phải, không đọc toàn bộ chữ trên slide  
**Lưu ý:** Khi chuyển slide, dừng khoảng 1 giây và nhìn về phía Hội đồng.

---

## Slide 1 — Giới thiệu đề tài (0:00–0:15)

**Lời nói:**

“Kính thưa Thầy và Hội đồng, nhóm em xin phép được báo cáo đồ án tốt nghiệp với đề tài: **MedSched – Hệ thống đặt lịch khám bệnh thông minh**, dưới sự hướng dẫn của Thầy Trương Thanh Bình.”

**Chuyển ý:** “Trước tiên, em xin trình bày bối cảnh thực tế và mục tiêu ra đời của dự án.”

---

## Slide 2 — Tổng quan dự án & Bối cảnh thực tế (0:15–0:45)

**Lời nói:**

“Xuất phát từ thực trạng hiện nay, người bệnh thường phải đến cơ sở y tế từ rất sớm, bốc số giấy và mệt mỏi chờ đợi hàng giờ; trong khi các phòng khám thiếu công cụ điều phối dẫn đến tình trạng khung giờ quá tải, khung giờ lại trống.

MedSched ra đời nhằm mang lại giải pháp số hóa toàn diện: giúp bệnh nhân chủ động chọn bác sĩ, khung giờ khám trực tuyến và tiếp đón nhanh qua mã QR; đồng thời hỗ trợ cơ sở y tế điều phối luồng khám khoa học, tối ưu công suất và số hóa khép kín toàn bộ quy trình ca khám.”

**Chuyển ý:** “Để vận hành giải pháp này, hệ thống được thiết kế phục vụ bốn vai trò người dùng cốt lõi.”

---

## Slide 3 — Bốn vai trò cốt lõi (0:45–1:15)

**Lời nói:**

“Hệ thống phục vụ bốn vai trò chính.

Bệnh nhân có thể chủ động đặt lịch, nhận mã QR và xem lại hồ sơ khám. Lễ tân dùng mã QR hoặc CCCD để tiếp nhận và cấp số thứ tự tự động. Bác sĩ quản lý hàng đợi ca trực, lập bệnh án điện tử và kê đơn thuốc số. Quản trị viên chịu trách nhiệm phân quyền, cấu hình phòng khám và theo dõi báo cáo doanh thu.

Mỗi vai trò có giao diện và không gian làm việc chuyên biệt theo cơ chế phân quyền RBAC.”

**Chuyển ý:** “Bốn vai trò này phối hợp nhịp nhàng trong một quy trình khám khép kín.”

---

## Slide 4 — Quy trình một ca khám (1:15–1:45)

**Lời nói:**

“Một ca khám gồm bốn giai đoạn liền mạch.

Đầu tiên, bệnh nhân chọn chuyên khoa, bác sĩ và khung giờ. Hệ thống tạo lịch hẹn cùng mã QR. Khi đến phòng khám, lễ tân quét mã đối soát và cấp số thứ tự buồng khám. Tiếp theo, bác sĩ gọi bệnh nhân, ghi nhận chẩn đoán ICD-10 và kê đơn thuốc. Cuối cùng, hệ thống xuất viện phí, hỗ trợ thanh toán tiền mặt hoặc VietQR và hoàn tất ca khám.

Trạng thái ca khám được cập nhật liên tục: từ **Booked**, **Checked-in**, **In progress** đến **Completed**.”

**Chuyển ý:** “Để vận hành quy trình này ổn định, nhóm xây dựng kiến trúc hệ thống theo các tầng rõ ràng.”

---

## Slide 5 — Kiến trúc tổng thể (1:45–2:10)

**Lời nói:**

“Ở phía người dùng, MedSched hỗ trợ đa nền tảng thông qua giao diện Next.js dạng PWA, sử dụng mượt mà trên máy tính và điện thoại.

Các yêu cầu đi qua Spring Security để xác thực JWT và kiểm tra quyền truy cập, sau đó được xử lý tại backend Spring Boot. Phần nghiệp vụ chính nằm trong Hexagonal Domain. Hệ thống lưu dữ liệu bằng MySQL, tích hợp VietQR và PayOS cho thanh toán, Gemini cho phân khoa ban đầu, đồng thời kết nối Prometheus và Grafana để giám sát.”

**Chuyển ý:** “Điểm cốt lõi trong kiến trúc này là phần lõi nghiệp vụ được tách độc lập.”

---

## Slide 6 — Kiến trúc Hexagonal (2:10–2:35)

**Lời nói:**

“Nhóm áp dụng kiến trúc Hexagonal, còn gọi là Ports and Adapters.

Ở trung tâm là Core Domain chứa các thực thể và quy tắc nghiệp vụ y tế. Phía Inbound tiếp nhận yêu cầu từ giao diện web và quầy lễ tân. Phía Outbound kết nối cơ sở dữ liệu MySQL, cổng thanh toán và các dịch vụ thông báo.

Cách tổ chức này giúp logic nghiệp vụ hoàn toàn độc lập với framework, dễ kiểm thử và linh hoạt khi nâng cấp công nghệ bên ngoài.”

**Chuyển ý:** “Dữ liệu của toàn bộ quy trình được tổ chức chặt chẽ trong cơ sở dữ liệu quan hệ.”

---

## Slide 7 — Cơ sở dữ liệu 3NF (2:35–2:55)

**Lời nói:**

“Cơ sở dữ liệu MySQL được chuẩn hóa đến 3NF với các ràng buộc khóa ngoại chặt chẽ.

Các bảng được phân tách khoa học theo hai nhóm: nhóm khám chữa bệnh gồm bác sĩ, chuyên khoa, lịch khám và bệnh án; cùng nhóm quản trị và viện phí gồm người dùng, phân quyền, hóa đơn và thanh toán.

Mỗi bảng chỉ lưu đúng một đối tượng riêng biệt, không lưu trùng lặp dữ liệu và ràng buộc khóa ngoại đảm bảo không bị xóa nhầm dữ liệu y tế quan trọng.”

**Chuyển ý:** “Từ nền tảng đó, nhóm tập trung giải quyết bài toán đặt lịch đồng thời.”

---

## Slide 8 — Chống đặt trùng lịch và hỗ trợ AI (2:55–3:30)

**Lời nói:**

“Bài toán quan trọng là nhiều người cùng bấm chọn một khung giờ khám. Nhóm sử dụng cơ chế Atomic Compare-and-Set: câu lệnh cập nhật trực tiếp tại database chỉ thực hiện khi slot khám vẫn ở trạng thái **Available**. Nhờ đó, tại một thời điểm chỉ duy nhất một người đặt thành công, người đến sau sẽ nhận mã 409 và được gợi ý khung giờ khác.

Nếu bệnh nhân chưa hoàn tất đặt chỗ, hệ thống tự động giải phóng slot sau 15 phút.

Bên cạnh đó, nhóm tích hợp Spring AI và Gemini để hỗ trợ phân luồng chuyên khoa ban đầu dựa trên mô tả triệu chứng của bệnh nhân.”

**Chuyển ý:** “Sau khi triển khai, hệ thống tiếp tục được theo dõi theo thời gian thực.”

---

## Slide 9 — Giám sát hệ thống (3:30–3:55)

**Lời nói:**

“Prometheus thu thập số liệu từ Spring Actuator định kỳ mỗi 5 giây, còn Grafana trực quan hóa tình trạng vận hành hệ thống.

Nhóm theo dõi độ trễ API, mức sử dụng CPU, bộ nhớ JVM Heap và kết nối cơ sở dữ liệu HikariCP. Trên dashboard giám sát thực tế, CPU duy trì ở mức an toàn khoảng 19%, JVM Heap khoảng 54,8 MB và hoàn toàn không có rò rỉ kết nối. Hệ thống cũng thiết lập sẵn ngưỡng cảnh báo tự động.”

**Chuyển ý:** “Sau đây, nhóm xin trình diễn nhanh luồng sử dụng thực tế của hệ thống.”

---

## Slide 10 — Demo nhanh (3:55–4:30)

**Thao tác và lời nói:**

1. **Mở trang đặt lịch:** “Bệnh nhân chọn chuyên khoa, bác sĩ và khung giờ còn trống.”
2. **Xác nhận đặt lịch:** “Sau khi xác nhận, hệ thống lập tức tạo phiếu hẹn và mã QR.”
3. **Chuyển sang giao diện lễ tân:** “Lễ tân quét mã QR để check-in và cấp số thứ tự vào buồng khám.”
4. **Mở giao diện bác sĩ:** “Bác sĩ gọi bệnh nhân theo số, cập nhật bệnh án và kê đơn thuốc.”
5. **Kết thúc:** “Thông tin được chuyển sang bước thanh toán viện phí để hoàn tất ca khám.”

**Nếu demo gặp trục trặc kỹ thuật:**

“Do thời lượng có hạn, nhóm xin phép chuyển sang video mô phỏng đã chuẩn bị sẵn để chứng minh cùng một quy trình hoàn chỉnh.”

**Chuyển ý:** “Từ phần trình diễn trên, nhóm xin tổng kết kết quả của đề tài.”

---

## Slide 11 — Tổng kết và định hướng phát triển (4:30–5:00)

**Lời nói:**

“Tóm lại, MedSched đã hoàn thiện trọn vẹn quy trình khám bệnh khép kín, phân quyền rõ ràng cho bốn vai trò và xây dựng nền tảng dữ liệu toàn vẹn chuẩn 3NF. Hệ thống xử lý triệt để bài toán đặt trùng lịch và có công cụ giám sát vận hành thời gian thực.

Trong thời gian tới, nhóm định hướng mở rộng: phát triển Kiosk tự phục vụ tại sảnh chờ, xây dựng Mobile App chuyên biệt kết hợp nhắc lịch qua SMS/Zalo, và chuẩn hóa API theo tiêu chuẩn HL7/FHIR để kết nối liên thông với các hệ thống bệnh viện lớn.

Phần trình bày của nhóm em đến đây là kết thúc. Nhóm em xin chân thành cảm ơn Quý Thầy/Cô Hội đồng đã lắng nghe, và xin sẵn sàng trả lời các câu hỏi.”

---

## Mẹo giữ đúng 5 phút

- Bắt đầu bấm giờ ngay khi mở lời chào Hội đồng.
- Không đọc từng chữ trên slide, chỉ nói các ý cốt lõi theo kịch bản.
- Nếu đến Slide 8 mà đồng hồ đã qua 3 phút 20 giây: nói ngắn gọn cơ chế chống trùng và chuyển nhanh sang Demo.
- Khi demo chỉ cần đi 3 bước chính: Đặt lịch ➔ Nhận QR ➔ Check-in tại quầy.
- Đảm bảo chuyển sang Slide Tổng kết trước mốc 4 phút 30 giây.

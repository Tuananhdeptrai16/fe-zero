import {
  KEY_DOCUMENT_CODE_NUMBER,
  KEY_DOCUMENT_NOTES,
  KEY_DOCUMENT_NUMBER,
  KEY_OTHER,
} from 'src/shared/constants/SettingSystem';

export const FIELD_MAP = {
  TOI_DANH: 'toi_danh_dieu_khoan_cua_blhs_duoc_ap_dung',
  HINH_PHAT_CHINH: 'hinh_phat_chinh',
  GHI_CHU_HINH_PHAT_CHINH: 'ghi_chu_hinh_phat_chinh',
  HINH_PHAT_BO_SUNG: 'hinh_phat_bo_sung',
  NGHIA_VU_DAN_SU: 'nghia_vu_dan_su',
  AN_PHI: 'an_phi',
  THOI_GIAN_PHAT_TU: 'thoi_gian_phat_tu',
  NGAY_CHAP_HANH: 'thoi_diem_chap_hanh_hinh_phat_chinh',
  SO_QUYET_DINH: 'so_quyet_dinh',
  NGAY_QUYET_DINH: 'ngay_thang_nam_ra_quyet_dinh',
  SO_GIAY_CHUNG_NHAN: 'so_giay_chung_nhan',
  CHUC_VU_CAM: 'chuc_vu_bi_cam_dam_nhiem',
  CAM_TU_NGAY: 'cam_tu_ngay',
  NGAY_CAP_NHAT: 'ngay_cap_nhat',
  TOA_AN_DA_TUYEN_BAN_AN: 'toa_an_da_tuyen_ban_an',
  NGAY_LAP: 'ngay_lap',
  TRANG_THAI: 'trang_thai',
  BIEN_PHAP_TU_PHAP: 'bien_phap_tu_phap',
  GHI_CHU_NGAY_CHAP_HANH: 'ghi_chu_ngay_chap_hanh',
  NGAY_TUYEN_AN: 'ngay_thang_nam_tuyen_an',
  THOI_HAN_CAM:
    'thoi_han_khong_duoc_thanh_lap,_quan_ly_doanh_nghiep,_hop_tac_xa',
  DIEU_KHOAN: 'dieu_khoan_blhs_ap_dung',
  NGAY_CHAP_HANH_XONG: 'ngay_thang_nam_chap_hanh_xong_an_phat',
};

export const VERDICT_FIELD = [
  {
    label: 'Nội dung bản án',
    options: [
      {
        label: 'Mã số bản án',
        value: KEY_DOCUMENT_CODE_NUMBER,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm tuyên án',
        value: 'ngay_thang_nam_tuyen_an',
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án đã tuyên bản án',
        value: 'toa_an_da_tuyen_ban_an',
      },
      {
        label: 'Tội danh',
        value: FIELD_MAP.TOI_DANH,
      },
      {
        label: 'Điều khoản',
        value: FIELD_MAP.DIEU_KHOAN,
      },
      {
        label: 'Thời gian phạt tù',
        value: FIELD_MAP.THOI_GIAN_PHAT_TU,
      },
      {
        label: 'Hình phạt chính',
        value: FIELD_MAP.HINH_PHAT_CHINH,
      },
      {
        label: 'Ghi chú hình phạt chính',
        value: FIELD_MAP.GHI_CHU_HINH_PHAT_CHINH,
      },
      {
        label: 'Hình phạt bổ sung (nếu có)',
        value: FIELD_MAP.HINH_PHAT_BO_SUNG,
      },
      {
        label: 'Nghĩa vụ dân sự (nếu có)',
        value: FIELD_MAP.NGHIA_VU_DAN_SU,
      },
      {
        label: 'Biện pháp tư pháp (nếu có)',
        value: 'bien_phap_tu_phap',
      },
      {
        label: 'Án phí',
        value: FIELD_MAP.AN_PHI,
      },
      {
        label: 'Thời điểm chấp hành hình phạt chính',
        value: FIELD_MAP.NGAY_CHAP_HANH,
      },
      {
        label: 'Ghi chú ngày chấp hành',
        value: 'ghi_chu_ngay_chap_hanh',
      },
      {
        label: 'Trạng thái (HC/CBS)',
        value: 'trang_thai',
      },
      {
        label: 'Ngày lập',
        value: 'ngay_lap',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
];

export const RELATED_DOCUMENT_FIELD = [
  {
    label: 'Quyết định thi hành bản án hình sự',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Nội dung quyết định',
        value: 'noi_dung_quyet_dinh',
      },
      {
        label: 'Thời điểm chấp hành hình phạt chính',
        value: 'thoi_diem_chap_hanh_hinh_phat_chinh',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label:
      'Quyết định miễn chấp hành án phạt tù có thời hạn/phạt cải tạo không giam giữ',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Nội dung quyết định',
        value: 'noi_dung_quyet_dinh',
      },
      {
        label: 'Án phạt được miễn chấp hành',
        value: 'an_phat_duoc_mien_chap_hanh',
      },
      {
        label: 'Ngày tháng năm được miễn',
        value: 'ngay_thang_nam_duoc_mien',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định miễn chấp hành án phạt cấm cư trú, án phạt quản chế',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Án phạt được miễn chấp hành',
        value: 'an_phat_duoc_mien_chap_hanh',
      },
      {
        label: 'Ngày tháng năm được miễn',
        value: 'ngay_thang_nam_duoc_mien',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định hoãn chấp hành án phạt tù',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Thời gian được hoãn',
        value: 'thoi_gian_duoc_hoan',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Cơ quan, tổ chức theo dõi, quản lý',
        value: 'co_quan,_to_chuc_theo_doi,_quan_ly',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label:
      'Quyết định giảm thời hạn chấp hành án phạt tù/án phạt cải tạo không giam giữ',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Hình phạt được giảm thời hạn chấp hành',
        value: 'hinh_phat_duoc_giam_thoi_han_chap_hanh',
      },
      {
        label: 'Thời gian được giảm',
        value: 'thoi_gian_duoc_giam',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định rút ngắn thời gian thử thách án treo',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Thời gian được rút ngắn',
        value: 'thoi_gian_duoc_rut_ngan',
      },
      {
        label: 'Ngày tháng năm quyết định có hiệu lực',
        value: 'ngay_thang_nam_quyet_dinh_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định tạm đình chỉ chấp hành án phạt tù',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Thời gian tạm đình chỉ',
        value: 'thoi_gian_tam_dinh_chi',
      },
      {
        label: 'Ngày tháng năm quyết định có hiệu lực',
        value: 'ngay_thang_nam_quyet_dinh_co_hieu_luc',
      },
      {
        label: 'Cơ quan theo dõi, quản lý',
        value: 'co_quan_theo_doi,_quan_ly',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label:
      'Giấy chứng nhận đã chấp hành xong án phạt tù/án phạt cải tạo không giam giữ/thời gian thử thách án treo',
    options: [
      {
        label: 'Số giấy chứng nhận',
        value: 'so_giay_chung_nhan',
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm cấp giấy chứng nhận',
        value: 'ngay_thang_nam_cap_giay_chung_nhan',
      },
      {
        label: 'Cơ quan chứng nhận',
        value: 'co_quan_chung_nhan',
      },
      {
        label: 'Án phạt đã chấp hành xong',
        value: 'an_phat_da_chap_hanh_xong',
      },
      {
        label: 'Về nơi cư trú tại',
        value: 've_noi_cu_tru_tai',
      },
      {
        label: 'Hình phạt bổ sung tiếp tục phải chấp hành',
        value: 'hinh_phat_bo_sung_tiep_tuc_phai_chap_hanh',
      },
      {
        label: 'Ngày tháng năm chấp hành xong án phạt',
        value: 'ngay_thang_nam_chap_hanh_xong_an_phat',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Văn bản thông báo kết quả thi hành án phạt trục xuất',
    options: [
      {
        label: 'Số văn bản',
        value: 'so_van_ban',
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: 'ngay_thang_nam_ra_quyet_dinh',
      },
      {
        label: 'Cơ quan thông báo',
        value: 'co_quan_thong_bao',
      },
      {
        label: 'Nội dung thông báo',
        value: 'noi_dung_thong_bao',
      },
      {
        label: 'Ngày tháng năm thi hành xong án phạt',
        value: 'ngay_thang_nam_thi_hanh_xong_an_phat',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định tiếp nhận chuyển giao',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Cơ quan ra quyết định',
        value: 'co_quan_ra_quyet_dinh',
      },
      {
        label: 'Nội dung quyết định',
        value: 'noi_dung_quyet_dinh',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label:
      'Quyết định thi hành quyết định tiếp nhận chuyển giao/Thông báo về việc thực hiện quyết định dẫn độ',
    options: [
      {
        label: 'Số văn bản',
        value: 'so_van_ban',
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: 'ngay_thang_nam_ra_quyet_dinh',
      },
      {
        label: 'Cơ quan ra văn bản',
        value: 'co_quan_ra_van_ban',
      },
      {
        label: 'Nội dung văn bản',
        value: 'noi_dung_van_ban',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label:
      'Giấy chứng nhận đã chấp hành xong án phạt cấm cư trú, án phạt quản chế, án phạt tước một số quyền công dân, án phạt cấm đảm nhiệm chức vụ, cấm hành nghề hoặc làm công việc nhất định',
    options: [
      {
        label: 'Số văn bản',
        value: 'so_van_ban',
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: 'ngay_thang_nam_ra_quyet_dinh',
      },
      {
        label: 'Cơ quan chứng nhận',
        value: 'co_quan_chung_nhan',
      },
      {
        label: 'Nội dung chứng nhận',
        value: 'noi_dung_chung_nhan',
      },
      {
        label: 'Ngày tháng năm chấp hành xong án phạt',
        value: 'ngay_thang_nam_chap_hanh_xong_an_phat',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định ân giảm án tử hình',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Cơ quan ra quyết định',
        value: 'co_quan_ra_quyet_dinh',
      },
      {
        label: 'Nội dung quyết định',
        value: 'noi_dung_quyet_dinh',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label:
      'Quyết định thi hành án phạt tiền, án phạt tịch thu tài sản, án phí và nghĩa vụ dân sự khác',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Cơ quan ra quyết định',
        value: 'co_quan_ra_quyet_dinh',
      },
      {
        label: 'Các khoản phải thi hành',
        value: 'cac_khoan_phai_thi_hanh',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label:
      'Quyết định miễn, giảm nghĩa vụ thi hành án đối với khoản thu nộp ngân sách nhà nước',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Cơ quan ra quyết định',
        value: 'co_quan_ra_quyet_dinh',
      },
      {
        label: 'Nội dung quyết định',
        value: 'noi_dung_quyet_dinh',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định đình chỉ thi hành án dân sự',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Cơ quan ra quyết định',
        value: 'co_quan_ra_quyet_dinh',
      },
      {
        label: 'Nội dung quyết định',
        value: 'noi_dung_quyet_dinh',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Giấy xác nhận kết quả thi hành án dân sự',
    options: [
      {
        label: 'Số văn bản',
        value: 'so_van_ban',
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: 'ngay_thang_nam_ra_quyet_dinh',
      },
      {
        label: 'Cơ quan xác nhận',
        value: 'co_quan_xac_nhan',
      },
      {
        label: 'Nội dung xác nhận (toàn bộ, một phần)',
        value: 'noi_dung_xac_nhan',
      },
      {
        label: 'Nghĩa vụ dân sự còn phải thi hành (nếu có)',
        value: 'nghia_vu_dan_su_con_phai_thi_hanh',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label:
      'Văn bản xác nhận đã chấp hành xong án phạt tiền, tịch thu tài sản, án phí và các nghĩa vụ dân sự khác trong bản án hình sự',
    options: [
      {
        label: 'Số văn bản',
        value: 'so_van_ban',
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: 'ngay_thang_nam_ra_quyet_dinh',
      },
      {
        label: 'Cơ quan ban hành',
        value: 'co_quan_ban_hanh',
      },
      {
        label: 'Nội dung xác nhận',
        value: 'noi_dung_xac_nhan',
      },
      {
        label: 'Ngày tháng năm chấp hành xong',
        value: 'ngay_thang_nam_chap_hanh_xong',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Giấy chứng nhận đặc xá',
    options: [
      {
        label: 'Số văn bản',
        value: 'so_van_ban',
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: 'ngay_thang_nam_ra_quyet_dinh',
      },
      {
        label: 'Cơ quan cấp giấy chứng nhận',
        value: 'co_quan_cap_giay_chung_nhan',
      },
      {
        label: 'Đã chấp hành xong hình phạt tù theo quyết định đặc xá số',
        value: 'da_chap_hanh_xong_hinh_phat_tu_theo_quyet_dinh_dac_xa_so',
      },
      {
        label: 'Được đặc xá tha tù trước thời hạn kể từ ngày',
        value: 'duoc_dac_xa_tha_tu_truoc_thoi_han_ke_tu_ngay',
      },
      {
        label: 'Về nơi cư trú tại',
        value: 've_noi_cu_tru_tai',
      },
      {
        label: 'Hình phạt bổ sung tiếp tục phải chấp hành',
        value: 'hinh_phat_bo_sung_tiep_tuc_phai_chap_hanh',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Giấy chứng nhận đại xá',
    options: [
      {
        label: 'Số giấy chứng nhận',
        value: 'so_giay_chung_nhan',
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: 'ngay_thang_nam_ra_quyet_dinh',
      },
      {
        label: 'Cơ quan cấp giấy chứng nhận',
        value: 'co_quan_cap_giay_chung_nhan',
      },
      {
        label: 'Được miễn trách nhiệm hình sự theo quyết định đại xá số',
        value: 'duoc_mien_trach_nhiem_hinh_su_theo_quyet_dinh_dai_xa_so',
      },
      {
        label: 'Được đại xá tha tù trước thời hạn kể từ ngày',
        value: 'duoc_dai_xa_tha_tu_truoc_thoi_han_ke_tu_ngay',
      },
      {
        label: 'Về nơi cư trú tại',
        value: 've_noi_cu_tru_tai',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định, giấy chứng nhận, giấy xác nhận, văn bản thông báo khác',
    options: [
      {
        label: 'Tên văn bản',
        value: 'ten_van_ban',
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Số giấy văn bản',
        value: 'so_giay_van_ban',
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: 'ngay_thang_nam_ra_quyet_dinh',
      },
      {
        label: 'Cơ quan ban hành văn bản',
        value: 'co_quan_ban_hanh_van_ban',
      },
      {
        label: 'Nội dung của văn bản',
        value: 'noi_dung_cua_van_ban',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định giám đốc thẩm',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Nội dung quyết định',
        value: 'noi_dung_quyet_dinh',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định tái thẩm',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Nội dung quyết định',
        value: 'noi_dung_quyet_dinh',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Giấy chứng nhận xóa án tích',
    options: [
      {
        label: 'Số chứng nhận',
        value: 'so_chung_nhan',
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm cấp giấy chứng nhận',
        value: 'ngay_thang_nam_cap_giay_chung_nhan',
      },
      {
        label: 'Tòa án cấp giấy chứng nhận',
        value: 'toa_an_cap_giay_chung_nhan',
      },
      {
        label: 'Nội dung chứng nhận',
        value: 'noi_dung_chung_nhan',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Quyết định xóa án tích',
    options: [
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Nội dung quyết định',
        value: 'noi_dung_quyet_dinh',
      },
      {
        label: 'Ngày tháng năm có hiệu lực',
        value: 'ngay_thang_nam_co_hieu_luc',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
  {
    label: 'Xác minh điều kiện đương nhiên được xóa án tích',
    options: [
      {
        label: 'Số bản án',
        value: KEY_DOCUMENT_NUMBER,
      },
      {
        label: 'Ngày tháng năm xác minh',
        value: 'ngay_thang_nam_xac_minh',
      },
      {
        label: 'Nơi thực hiện việc xác minh',
        value: 'noi_thuc_hien_viec_xac_minh',
      },
      {
        label: 'Kết quả xác minh',
        value: 'ket_qua_xac_minh',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
];

export const PROHIBIT_POSITION_DOCUMENT_FIELD = [
  {
    label: 'Cấm đảm nhiệm chức vụ, thành lập, quản lý doanh nghiệp, hợp tác xã',
    options: [
      {
        label: 'Số thứ tự thông tin',
        value: 'so_thu_tu_thong_tin',
      },
      {
        label: 'Số quyết định',
        value: FIELD_MAP.SO_QUYET_DINH,
      },
      {
        label: 'Ngày tháng năm ra văn bản',
        value: FIELD_MAP.NGAY_QUYET_DINH,
      },
      {
        label: 'Tòa án ra quyết định',
        value: 'toa_an_ra_quyet_dinh',
      },
      {
        label: 'Chức vụ bị cấm đảm nhiệm',
        value: 'chuc_vu_bi_cam_dam_nhiem',
      },
      {
        label: 'Cấm từ ngày',
        value: 'cam_tu_ngay',
      },
      {
        label:
          'Thời hạn không được thành lập, quản lý doanh nghiệp, hợp tác xã',
        value:
          'thoi_han_khong_duoc_thanh_lap,_quan_ly_doanh_nghiep,_hop_tac_xa',
      },
      {
        label: 'Ghi chú',
        value: KEY_DOCUMENT_NOTES,
      },
    ],
  },
];

export const COMMON_DOCUMENT_FIELD = [
  {
    label: 'Thông tin khác',
    options: [
      {
        label: 'Ngày tháng năm cập nhật',
        value: 'ngay_thang_nam_cap_nhat',
      },
      {
        label: 'Người cập nhật',
        value: 'nguoi_cap_nhat',
      },
      {
        label: 'Ngày cập nhật',
        value: 'ngay_cap_nhat',
      },
      {
        label: 'Thông tin khác',
        value: KEY_OTHER,
      },
    ],
  },
];

export const KeyRelatedDocument = [
  'Số quyết định',
  'Ngày tháng năm ra văn bản',
  'Tòa án ra quyết định',
  'Nội dung quyết định',
  'Thời điểm chấp hành hình phạt chính',
  'Ghi chú',
  'Án phạt được miễn chấp hành',
  'Thời gian được hoãn',
  'Cơ quan, tổ chức theo dõi, quản lý',
  'Hình phạt được giảm thời hạn chấp hành',
  'Thời gian được giảm',
  'Thời gian được rút ngắn',
  'Ngày tháng năm quyết định có hiệu lực',
  'Thời gian tạm đình chỉ',
  'Cơ quan theo dõi, quản lý',
  'Giấy chứng nhận đã chấp hành xong án phạt tù/án phạt cải tạo không giam giữ/thời gian thử thách án treo',
  'Số giấy chứng nhận',
  'Ngày tháng năm cấp giấy chứng nhận',
  'Cơ quan chứng nhận',
  'Án phạt đã chấp hành xong',
  'Về nơi cư trú tại',
  'Hình phạt bổ sung tiếp tục phải chấp hành',
  'Ngày tháng năm chấp hành xong án phạt',
  'Văn bản thông báo kết quả thi hành án phạt trục xuất',
  'Số văn bản',
  'Ngày tháng năm ra văn bản',
  'Cơ quan thông báo',
  'Nội dung thông báo',
  'Ngày tháng năm thi hành xong án phạt',
  'Cơ quan ra quyết định thực hiện quyết định dẫn độ',
  'Cơ quan ra văn bản',
  'Nội dung văn bản',
  'Giấy chứng nhận đã chấp hành xong án phạt cấm cư trú, án phạt quản chế, án phạt tước một số quyền công dân, án phạt cấm đảm nhiệm chức vụ, cấm hành nghề hoặc làm công việc nhất định',
  'Nội dung chứng nhận vụ dân sự khác',
  'Các khoản phải thi hành sách nhà nước',
  'Giấy xác nhận kết quả thi hành án dân sự',
  'Cơ quan xác nhận',
  'Nội dung xác nhận (toàn bộ, một phần)',
  'Nghĩa vụ dân sự còn phải thi hành (nếu có)',
  'Văn bản xác nhận đã chấp hành xong án phạt tiền, tịch thu tài sản, án phí và các nghĩa vụ dân sự khác trong bản án hình sự',
  'Cơ quan ban hành',
  'Nội dung xác nhận',
  'Ngày tháng năm chấp hành xong',
  'Giấy chứng nhận đặc xá',
  'Cơ quan cấp giấy chứng nhận',
  'Đã chấp hành xong hình phạt tù theo quyết định đặc xá số',
  'Được đặc xá tha tù trước thời hạn kể từ ngày',
  'Giấy chứng nhận đại xá',
  'Được miễn trách nhiệm hình sự theo quyết định đại xá số',
  'Được đại xá tha tù trước thời hạn kể từ ngày',
  'Tên văn bản',
  'Số giấy văn bản',
  'Cơ quan ban hành văn bản',
  'Nội dung của văn bản',
  'Giấy chứng nhận xóa án tích',
  'Số chứng nhận',
  'Tòa án cấp giấy chứng nhận',
  'Xác minh điều kiện đương nhiên được xóa án tích',
  'Ngày tháng năm xác minh',
  'Nơi thực hiện việc xác minh',
  'Kết quả xác minh',
  'Ngày tháng năm có hiệu lực',
  'Các khoản phải thi hành',
];

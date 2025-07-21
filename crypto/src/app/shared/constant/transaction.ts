export const TRANSACTION_TYPES = [
    { value: '', name: 'None' },
    { value: 'ENROLLMENT', name: 'Đăng ký sinh trắc học' },
    { value: 'DELEGATE', name: 'Uỷ quyền' },
    { value: 'ASSIGNMENT', name: 'Phân công' }
];

export const TRANSACTION_STATUSES = [
    { value: '', name: 'None' },
    { value: 'PENDING', name: 'Chờ xử lý' },
    { value: 'ACTIVE', name: 'Đang hiệu lực' },
    { value: 'INACTIVE', name: 'Chưa hiệu lực' },
    { value: 'CANCELLED', name: 'Đã huỷ' },
    { value: 'EXPIRED', name: 'Đã hết hạn' },
    { value: 'REJECTED', name: 'Từ chối' }
];

export const ACCESS_LEVELS = [
    { value: '', name: 'None' },
    { value: 'truong_banql', name: 'Trưởng BQL' },
    { value: 'thanh_phan_1', name: 'Thành viên số 1' },
    { value: 'thanh_phan_2', name: 'Thành viên số 2' }
];

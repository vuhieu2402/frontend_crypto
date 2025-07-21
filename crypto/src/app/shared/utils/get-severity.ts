export function getSeverity(status: string) {
    switch (status) {
        case 'ACTIVE':
        case 'APPROVED':
            return 'success';
        case 'INACTIVE':
            return 'info';
        case 'PENDING':
            return 'warn';
        case 'CANCELLED':
        case 'REJECTED':
            return 'danger';
        case 'EXPIRED':
            return 'secondary';
        default:
            return 'contrast';
    }
}

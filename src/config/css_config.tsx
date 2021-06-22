// export const bookInstanceStatusColor = {
//     "Maintenance": "#dc3545",
//     "Available": "#28a745",
//     "Loaned": "#ffc107",
//     "Reserved": "#ffc107"
// }



interface bookInstanceStatusInterface {
    [key: string]: string
}

export const bookInstanceStatusColor : bookInstanceStatusInterface = {
    "Maintenance": "#dc3545",
    "Available": "#28a745",
    "Loaned": "#ffc107",
    "Reserved": "#ffc107"
}

// export enum bookInstanceStatusColor {
//     "Maintenance" = "#dc3545",
//     "Available" = "#28a745",
//     "Loaned" = "#ffc107",
//     "Reserved" = "#ffc107"
// }


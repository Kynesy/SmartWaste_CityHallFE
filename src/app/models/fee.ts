export interface Fee {
    id: string
    timestamp: string
    userId: string
    paid: number
    sortedWaste: number
    unsortedWaste: number
    sortedTax: number
    unsortedTax: number;
}

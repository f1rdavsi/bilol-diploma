export type TableRow = Record<string, unknown> & {
  id: number
  status?: string
  client?: { fullName?: string }
  car?: { brand?: string, model?: string, plateNumber?: string }
  employee?: { name?: string }
}

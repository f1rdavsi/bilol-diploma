import { PrismaClient, UserRole, RepairStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@autoservice.local' },
    update: {},
    create: { name: 'Администратор', email: 'admin@autoservice.local', password, role: UserRole.ROLE_ADMIN }
  })

  const manager = await prisma.user.upsert({
    where: { email: 'manager@autoservice.local' },
    update: {},
    create: { name: 'Менеджер', email: 'manager@autoservice.local', password, role: UserRole.ROLE_MANAGER }
  })

  const mechanic = await prisma.user.upsert({
    where: { email: 'mechanic@autoservice.local' },
    update: {},
    create: { name: 'Механик', email: 'mechanic@autoservice.local', password, role: UserRole.ROLE_MECHANIC }
  })

  const client = await prisma.client.create({
    data: { fullName: 'Иван Петров', phone: '+992 900 00 00 01', address: 'Душанбе' }
  })

  const car = await prisma.car.create({
    data: {
      clientId: client.id,
      brand: 'Toyota',
      model: 'Camry',
      year: 2018,
      vin: 'JTNB11HK0J3000001',
      plateNumber: '0001AA01'
    }
  })

  await prisma.repairOrder.create({
    data: {
      clientId: client.id,
      carId: car.id,
      employeeId: mechanic.id,
      problemDescription: 'Диагностика подвески и замена масла',
      status: RepairStatus.QUEUE,
      queuePosition: 1,
      price: 450
    }
  })

  console.log({ admin: admin.email, manager: manager.email, mechanic: mechanic.email, password: 'password123' })
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })

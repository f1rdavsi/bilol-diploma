import { PrismaClient, RepairStatus, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const serviceSeed = [
  {
    slug: 'diagnostics',
    title: 'Комплексная диагностика',
    short: 'Проверка электронных систем, ходовой части, двигателя и безопасности.',
    description: 'Проводим комплексную диагностику автомобиля перед ремонтом, покупкой или дальней поездкой. Находим реальные причины неисправностей и показываем клиенту понятный план работ.',
    price: 150,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e1e?auto=format&fit=crop&w=1200&q=85',
    icon: 'ScanLine',
    benefits: ['Точная локализация неисправностей', 'Отчет по ключевым узлам', 'Рекомендации по приоритету ремонта'],
    steps: ['Прием автомобиля и фиксация жалоб', 'Компьютерная и визуальная проверка', 'Согласование работ и стоимости'],
    sortOrder: 1
  },
  {
    slug: 'engine-repair',
    title: 'Ремонт двигателя',
    short: 'Диагностика, обслуживание и ремонт бензиновых и дизельных двигателей.',
    description: 'Выполняем ремонт двигателя с контролем компрессии, герметичности, состояния навесного оборудования и систем охлаждения. Работаем аккуратно и по согласованной смете.',
    price: 800,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=85',
    icon: 'Gauge',
    benefits: ['Проверка причин перегрева и потери мощности', 'Подбор качественных запчастей', 'Гарантия на выполненные работы'],
    steps: ['Первичная диагностика', 'Разбор и дефектовка', 'Ремонт, сборка и тестовый запуск'],
    sortOrder: 2
  },
  {
    slug: 'suspension',
    title: 'Ремонт ходовой части',
    short: 'Подвеска, рулевое управление, тормозная система и развал-схождение.',
    description: 'Устраняем стуки, вибрации, неравномерный износ шин и проблемы с управляемостью. После ремонта проверяем автомобиль в динамике.',
    price: 250,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=85',
    icon: 'Settings2',
    benefits: ['Четкая управляемость', 'Комфорт без стуков и вибраций', 'Безопасное торможение'],
    steps: ['Осмотр на подъемнике', 'Замена изношенных деталей', 'Финальная проверка и рекомендации'],
    sortOrder: 3
  },
  {
    slug: 'oil-service',
    title: 'Замена масла',
    short: 'Моторное масло, фильтры, технические жидкости и сервисный интервал.',
    description: 'Подбираем масло по допускам производителя, меняем фильтры и проверяем базовые параметры автомобиля во время обслуживания.',
    price: 90,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=85',
    icon: 'BatteryCharging',
    benefits: ['Подбор по VIN и допускам', 'Быстрое обслуживание', 'Контроль утечек и уровня жидкостей'],
    steps: ['Подбор расходников', 'Замена масла и фильтров', 'Сброс сервисного интервала'],
    sortOrder: 4
  },
  {
    slug: 'computer-diagnostics',
    title: 'Компьютерная диагностика',
    short: 'Считывание ошибок, live data, адаптации и проверка электронных блоков.',
    description: 'Используем профессиональные диагностические сканеры для поиска ошибок в электронных системах автомобиля и проверки параметров в реальном времени.',
    price: 120,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=85',
    icon: 'BrainCircuit',
    benefits: ['Работа с современными блоками управления', 'Расшифровка ошибок понятным языком', 'Проверка после ремонта'],
    steps: ['Подключение сканера', 'Анализ кодов и параметров', 'План устранения неисправностей'],
    sortOrder: 5
  },
  {
    slug: 'auto-electric',
    title: 'Автоэлектрика',
    short: 'Проводка, свет, датчики, генератор, стартер и электронные системы.',
    description: 'Ищем сложные электрические неисправности, восстанавливаем проводку, проверяем питание, датчики и исполнительные механизмы.',
    price: 200,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85',
    icon: 'Zap',
    benefits: ['Поиск скрытых проблем', 'Аккуратное восстановление проводки', 'Проверка нагрузкой'],
    steps: ['Диагностика цепей', 'Ремонт или замена элементов', 'Контрольная проверка систем'],
    sortOrder: 6
  }
]

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

  const client = await prisma.client.findFirst({ where: { phone: '+992 900 00 00 01' } })
    || await prisma.client.create({
      data: { fullName: 'Иван Петров', phone: '+992 900 00 00 01', address: 'Душанбе' }
    })

  const car = await prisma.car.upsert({
    where: { vin: 'JTNB11HK0J3000001' },
    update: {
      clientId: client.id,
      brand: 'Toyota',
      model: 'Camry',
      year: 2018,
      plateNumber: '0001AA01'
    },
    create: {
      clientId: client.id,
      brand: 'Toyota',
      model: 'Camry',
      year: 2018,
      vin: 'JTNB11HK0J3000001',
      plateNumber: '0001AA01'
    }
  })

  const existingOrder = await prisma.repairOrder.findFirst({
    where: {
      clientId: client.id,
      carId: car.id,
      problemDescription: 'Диагностика подвески и замена масла'
    }
  })

  if (!existingOrder) {
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
  }

  for (const service of serviceSeed) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    })
  }

  console.log({ admin: admin.email, manager: manager.email, mechanic: mechanic.email, password: 'password123' })
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })

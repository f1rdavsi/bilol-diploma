import {
  BatteryCharging,
  BrainCircuit,
  Car,
  CarFront,
  Cpu,
  Gauge,
  HeartHandshake,
  Medal,
  ScanLine,
  Settings2,
  ShieldCheck,
  Sparkles,
  Timer,
  Wrench,
  Zap
} from 'lucide-vue-next'
import type { Component } from 'vue'

export type MarketingService = {
  id?: number
  slug: string
  title: string
  short: string
  description: string
  price: string | number
  currency?: string
  image: string
  icon: Component
  iconName?: string
  benefits: string[]
  steps: string[]
  isActive?: boolean
  sortOrder?: number
}

export const siteNav = [
  { label: 'Главная', to: '/' },
  { label: 'О компании', to: '/about' },
  { label: 'Услуги', to: '/services' },
  { label: 'Контакты', to: '/contacts' }
]

export const features = [
  {
    title: '12 лет опыта',
    text: 'Работаем с европейскими, японскими, корейскими и премиальными автомобилями.',
    icon: Medal
  },
  {
    title: 'Сертифицированные мастера',
    text: 'Диагностика, ремонт и контроль качества выполняются профильными специалистами.',
    icon: ShieldCheck
  },
  {
    title: 'Технологичное оборудование',
    text: 'Сканеры, подъемники, стенды и цифровая история работ по каждому автомобилю.',
    icon: Cpu
  },
  {
    title: 'Гарантия на работы',
    text: 'Прозрачная смета, понятные сроки и гарантийная поддержка после ремонта.',
    icon: HeartHandshake
  }
]

export const services: MarketingService[] = [
  {
    slug: 'diagnostics',
    title: 'Комплексная диагностика',
    short: 'Проверка электронных систем, ходовой части, двигателя и безопасности.',
    description: 'Проводим комплексную диагностику автомобиля перед ремонтом, покупкой или дальней поездкой. Находим реальные причины неисправностей и показываем клиенту понятный план работ.',
    price: 150,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e1e?auto=format&fit=crop&w=1200&q=85',
    icon: ScanLine,
    benefits: ['Точная локализация неисправностей', 'Отчет по ключевым узлам', 'Рекомендации по приоритету ремонта'],
    steps: ['Прием автомобиля и фиксация жалоб', 'Компьютерная и визуальная проверка', 'Согласование работ и стоимости']
  },
  {
    slug: 'engine-repair',
    title: 'Ремонт двигателя',
    short: 'Диагностика, обслуживание и ремонт бензиновых и дизельных двигателей.',
    description: 'Выполняем ремонт двигателя с контролем компрессии, герметичности, состояния навесного оборудования и систем охлаждения. Работаем аккуратно и по согласованной смете.',
    price: 800,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=85',
    icon: Gauge,
    benefits: ['Проверка причин перегрева и потери мощности', 'Подбор качественных запчастей', 'Гарантия на выполненные работы'],
    steps: ['Первичная диагностика', 'Разбор и дефектовка', 'Ремонт, сборка и тестовый запуск']
  },
  {
    slug: 'suspension',
    title: 'Ремонт ходовой части',
    short: 'Подвеска, рулевое управление, тормозная система и развал-схождение.',
    description: 'Устраняем стуки, вибрации, неравномерный износ шин и проблемы с управляемостью. После ремонта проверяем автомобиль в динамике.',
    price: 250,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=85',
    icon: Settings2,
    benefits: ['Четкая управляемость', 'Комфорт без стуков и вибраций', 'Безопасное торможение'],
    steps: ['Осмотр на подъемнике', 'Замена изношенных деталей', 'Финальная проверка и рекомендации']
  },
  {
    slug: 'oil-service',
    title: 'Замена масла',
    short: 'Моторное масло, фильтры, технические жидкости и сервисный интервал.',
    description: 'Подбираем масло по допускам производителя, меняем фильтры и проверяем базовые параметры автомобиля во время обслуживания.',
    price: 90,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=85',
    icon: BatteryCharging,
    benefits: ['Подбор по VIN и допускам', 'Быстрое обслуживание', 'Контроль утечек и уровня жидкостей'],
    steps: ['Подбор расходников', 'Замена масла и фильтров', 'Сброс сервисного интервала']
  },
  {
    slug: 'computer-diagnostics',
    title: 'Компьютерная диагностика',
    short: 'Считывание ошибок, live data, адаптации и проверка электронных блоков.',
    description: 'Используем профессиональные диагностические сканеры для поиска ошибок в электронных системах автомобиля и проверки параметров в реальном времени.',
    price: 120,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=85',
    icon: BrainCircuit,
    benefits: ['Работа с современными блоками управления', 'Расшифровка ошибок понятным языком', 'Проверка после ремонта'],
    steps: ['Подключение сканера', 'Анализ кодов и параметров', 'План устранения неисправностей']
  },
  {
    slug: 'auto-electric',
    title: 'Автоэлектрика',
    short: 'Проводка, свет, датчики, генератор, стартер и электронные системы.',
    description: 'Ищем сложные электрические неисправности, восстанавливаем проводку, проверяем питание, датчики и исполнительные механизмы.',
    price: 200,
    currency: 'TJS',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85',
    icon: Zap,
    benefits: ['Поиск скрытых проблем', 'Аккуратное восстановление проводки', 'Проверка нагрузкой'],
    steps: ['Диагностика цепей', 'Ремонт или замена элементов', 'Контрольная проверка систем']
  }
]

export const marketingIconMap: Record<string, Component> = {
  BatteryCharging,
  BrainCircuit,
  Car,
  CarFront,
  Cpu,
  Gauge,
  HeartHandshake,
  Medal,
  ScanLine,
  Settings2,
  ShieldCheck,
  Sparkles,
  Timer,
  Wrench,
  Zap
}

export function withMarketingIcon<T extends Omit<MarketingService, 'icon'> & { icon?: Component }>(service: T): MarketingService {
  const iconName = service.iconName || (typeof service.icon === 'string' ? service.icon : undefined) || 'Wrench'

  return {
    ...service,
    iconName,
    icon: service.icon || marketingIconMap[iconName] || Wrench
  }
}

export function apiServiceToMarketing(service: {
  id?: number
  slug: string
  title: string
  short: string
  description: string
  price: string | number
  currency?: string
  image: string
  icon?: string
  benefits: string[]
  steps: string[]
  isActive?: boolean
  sortOrder?: number
}) {
  const { icon, ...data } = service

  return withMarketingIcon({
    ...data,
    iconName: icon || 'Wrench'
  })
}

export function fallbackServices() {
  return services.map((service, index) => withMarketingIcon({
    ...service,
    iconName: service.iconName || Object.entries(marketingIconMap).find(([, icon]) => icon === service.icon)?.[0] || 'Wrench',
    sortOrder: index + 1,
    isActive: true
  }))
}

export function formatServicePrice(service: Pick<MarketingService, 'price' | 'currency'>) {
  const value = Number(service.price || 0)
  const formatted = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value)
  const currency = service.currency === 'TJS' || !service.currency ? 'сомони' : service.currency

  return `от ${formatted} ${currency}`
}

export const stats = [
  { value: '7 400+', label: 'клиентов доверили нам автомобили' },
  { value: '18 900+', label: 'ремонтов выполнено в срок' },
  { value: '26', label: 'сотрудников в команде сервиса' }
]

export const testimonials = [
  {
    name: 'Алексей Романов',
    car: 'BMW 5 Series',
    text: 'Приехал со сложной ошибкой по электронике. Нашли причину за день, согласовали стоимость и все сделали без сюрпризов.',
    rating: 5
  },
  {
    name: 'Мадина Каримова',
    car: 'Toyota Camry',
    text: 'Понравилось, что показали фото деталей и объяснили, что срочно, а что можно оставить на следующий сервис.',
    rating: 5
  },
  {
    name: 'Дмитрий Волков',
    car: 'Mercedes-Benz GLC',
    text: 'Чистая зона приемки, быстрый контакт с менеджером и ощущение, что машина реально под контролем.',
    rating: 5
  }
]

export const servicePhotos = [
  {
    src: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c833fc?auto=format&fit=crop&w=1200&q=85',
    alt: 'Современная зона ремонта автомобилей'
  },
  {
    src: 'https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?auto=format&fit=crop&w=1200&q=85',
    alt: 'Механик выполняет обслуживание автомобиля'
  },
  {
    src: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1200&q=85',
    alt: 'Премиальный автомобиль в сервисной зоне'
  }
]

export const team = [
  { name: 'Илья Соколов', role: 'Главный мастер', icon: Wrench },
  { name: 'Никита Орлов', role: 'Диагност', icon: Cpu },
  { name: 'София Белова', role: 'Менеджер сервиса', icon: CarFront },
  { name: 'Руслан Мирзоев', role: 'Автоэлектрик', icon: Sparkles }
]

export const heroImage = 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1800&q=90'
export const ctaImage = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=90'
export const contactImage = 'https://images.unsplash.com/photo-1562426509-5044a121aa49?auto=format&fit=crop&w=1400&q=85'
export const aboutImage = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=90'

import i18n from '@/i18n'

export function translateTitle(title) {
  const { t, te } = i18n.global
  if (te(`appI18n.${title}`)) return t(`appI18n.${title}`)
  return title
}

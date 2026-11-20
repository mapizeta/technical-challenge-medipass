export function validarRut(rut: string): boolean {
  const limpio = rut
    .replace(/\./g, '')
    .replace(/-/g, '')
    .replace(/\s/g, '')
    .toUpperCase()

  if (!/^\d{7,8}[0-9K]$/.test(limpio)) {
    return false
  }

  const cuerpo = limpio.slice(0, -1)
  const digitoIngresado = limpio.slice(-1)

  let suma = 0
  let multiplicador = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }

  const resto = 11 - (suma % 11)

  let digitoCalculado: string

  if (resto === 11) {
    digitoCalculado = '0'
  } else if (resto === 10) {
    digitoCalculado = 'K'
  } else {
    digitoCalculado = String(resto)
  }

  return digitoCalculado === digitoIngresado
}
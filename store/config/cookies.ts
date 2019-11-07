interface MaxAge {
  oneMonth: number
}
interface Cookies {
  [key: string] :CookieItem
}
interface CookieItem {
  name: string,
  maxAge: number
}

const maxAge: MaxAge = {
  oneMonth: 60 * 60 * 24 * 30
}

export const cookies: Cookies = {
  authUser: {
    name: 'authUser',
    maxAge: maxAge.oneMonth
  }
}
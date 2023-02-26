export const cacheProvider = {
  // quando na config do env for ethereal retorna o provider do ethereal e etc..
  ethereal: new EtherealMailProvider(),
  ses: new SESMailProvider(),
}

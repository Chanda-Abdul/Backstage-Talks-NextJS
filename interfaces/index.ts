export type Cover = {
    id: string | number,
    title: string ,
    img: string ,
    available_for_purchase: boolean,
    link_to_purchase: string,
    link_color: string ,
    background_color: string 
  }

  export type ResponseError = {
    message: string
  }
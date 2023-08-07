class PlanDefault {
  public business_amount = 1;
  public images_per_product = 3;
  public products_per_business = 5;
  public api_id: null | string = null;
}

class Free extends PlanDefault { }

class Basic extends PlanDefault {
  public business_amount = 1;
  public images_per_product = 6;
  public products_per_business = 25;
  public api_id = "price_1NU9mpHRsKrr5uaEzry7dZzO";
}

class Advanced extends PlanDefault {
  public business_amount = 2;
  public images_per_product = 6;
  public products_per_business = 25;
  public api_id = "price_1NYEWkHRsKrr5uaEQrniLuYO";
}

class Agency extends PlanDefault {
  public business_amount = 2;
  public images_per_product = 6;
  public products_per_business = 25;
  public api_id = "price_1NYEVUHRsKrr5uaEo2juOH8v";
}

export const getPlan = ( plan: string) => {
  if ( plan === 'FREE' ) return new Free;
  if ( plan === 'BASIC' ) return new Basic;
  if ( plan === 'ADVANCED' ) return new Advanced;
  if ( plan === 'AGENCY' ) return new Agency;
  return new PlanDefault
}
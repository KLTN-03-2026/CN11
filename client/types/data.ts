export interface UserType {
  id: number;
  codeuser: string;
  username: string;
  phone: string;
  email: string;
  active: boolean;
  tag: string;
  role: {
    value: string;
    code: string;
  };
  createdAt: string;
  updatedAt: string;
  avatar: {
    avatarlink: string;
  };
  isVerify: boolean;
  address: string;
}

export interface ResponseLogin {
  data: DataLogin;
}

interface DataLogin {
  error: number;
  message: string;
  access_token: string | null;
  role_user: string;
  user: UserType;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  des: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataContact {
  error: number;
  message: string;
  data: Contact[];
}

export interface ResponseContact {
  data: DataContact;
}

export interface LogType {
  id: number;
  active: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  role_log: {
    code: string;
    value: string;
  };
  user: {
    username: string;
    email: string;
    phone: string;
    isVerify: boolean;
    address: string;
  };
}

export interface CategoriesType {
  id: number;
  codecategories: string;
  name: string;
  des: string;
  active: boolean;
}

export interface ConditionType {
  name: string;
  codecondition: string;
  id: number;
  active: boolean;
}

export interface VoucherType {
  id: number;
  codevoucher: string;
  name: string;
  sale: string;
  style: string;
  exprice: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  category_voucher: {
    name: string;
    id: number;
    codecategories: string;
  };
  condition: {
    name: string;
    codecondition: string;
    id: number;
  };
}

export interface Food {
  id: number;
  codefood: string;
  name: string;
  price: string;
  category: {
    name: string;
    codecategories: string;
    des: string;
  };
  image: string;
  tag: string;
  note: string;
  customers: {
    codefood: string;
    quatify: number;
  };
}

export interface BankHistoryType {
  id: number;
  codebank: string;
  codeorder: string;
  codetable: string;
  total: string;
  method: string;
  date: string;
  hour: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user_bank: {
    id: number;
    codeuser: string;
    username: string;
    phone: string;
    email: string | null;
    active: number;
    tag: string;
    rolecode: string;
    address: string | null;
    isVerify: boolean;
  };
  table: {
    id: number;
    codetable: string;
    codefloor: string;
    name: string;
    url: string;
    active: boolean;
  };
}

export interface RoleType {
  code: string;
  value: string;
  id: number;
}

export interface DataOrderChart {
  id: number;
  createdAt: string;
  total: string;
}

export interface RevenueByDay {
  date: string;
  total: number;
}

export interface ItemListBuy {
  quatify: string;
  codebuy: string;
  foods: {
    name: string;
    price: string;
    codefood: string;
    image: string;
    tag: string;
    note: string;
  };
}

export interface OrderBookedType {
  id: number;
  codeorder: string;
  status: "inservice" | "cooking" | "complete";
  createdAt: string;
  order_table: {
    name: string;
    url: string;
    codetable: string;
    table_status: {
      customer: string;
      isorder: boolean;
    };
    floor_table: {
      name: string;
      codefloor: string;
    };
  };
  order_user: {
    codeuser: string;
    username: string;
    email: string | null;
    phone: string;
    isVerify: boolean;
    address: string | null;
  };
  order_items: {
    quantify: string;
    total: string;
    note: string;
    codeitem: string;
    item_listbuy: ItemListBuy[];
  };
}

export interface FloorType {
  id: number;
  codefloor: string;
  name: string;
}

export interface TableType {
  id: number;
  isorder: boolean;
  createdAt: string;
  order_customer: {
    customer: string;
  };
  order_table_name: {
    codetable: string;
    name: string;
    url: string;
    active: boolean;
  };
  order_floor: {
    codefloor: string;
    name: string;
  };
  order_hour_name: {
    codehour: string;
    hour: string;
  };
}

export interface DataTableType {
  id: number;
  codetable: string;
  codefloor: string;
  name: string;
  url: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HourType {
  id: number;
  hour: string;
  active: boolean;
  codehour: string;
}

export interface OrderTableType {
  id: number;
  codeordertable: string;
  email: string;
  phone: string;
  date: string;
  guest: string;
  status: boolean;
  createdAt: string;
  order_hour: {
    codehour: string;
    hour: string;
    active: boolean;
  };
  order_table: {
    codetable: string;
    name: string;
    url: string;
  };
}

export interface OrderTableStatusType {
  id: number;
  codetable: string;
  codehour: string;
  createdAt: string;
}

export interface DataBellToUser {
  id: 3;
  codeuser: string;
  status: boolean;
  codebell: string;
  codeuserreceive: string;
  createdAt: string;
  updatedAt: string;
  bell: {
    id: number;
    codebell: string;
    title: string;
    des: string;
    rolecode: string;
    active: boolean;
    codetype: string;
    createdAt: string;
    bell_type: {
      id: number;
      title: string;
      codetype: string;
    };
  };
}

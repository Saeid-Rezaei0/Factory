import React from 'react';
import BreadCrumb from 'Common/BreadCrumb';

const Index = () => {
    return (
        <React.Fragment>
            <div className='container-fluid group-data-[content=boxed]:max-w-boxed mx-auto'>
                <BreadCrumb title='Ecommerce' pageTitle='صفحه تست من' />
                <>
                    سلام این صفحه تست من هستش برای تایید ایجاد صفحه
                </>
            </div>
        </React.Fragment>
    );
};

export default Index;

export const  datafactory =   [
    {
      FactoryName: "کارخانه آرد نمونه",
      FactoryID: "1234567890",
      FactoryCode: "FAC001",
      PhoneNumber: "09121234567",
      ProvinceName: "تهران",
      CityName: "تهران",
      Address: "خیابان ولیعصر، پلاک 15",
      Location: "35.6892, 51.3890",
      PostalCode: "1234567890",
      FactoryStatus: "فعال",
      PlateReaderCode: "PLR001",
      WeightReaderCode: "WRC001"
    },
    {
      FactoryName: "کارخانه آرد ممتاز",
      FactoryID: "0987654321",
      FactoryCode: "FAC002",
      PhoneNumber: "09129876543",
      ProvinceName: "اصفهان",
      CityName: "اصفهان",
      Address: "خیابان چهارباغ، پلاک 20",
      Location: "32.6546, 51.6680",
      PostalCode: "9876543210",
      FactoryStatus: "غیرفعال",
      PlateReaderCode: "PLR002",
      WeightReaderCode: "WRC002"
    },
    {
      FactoryName: "کارخانه آرد بهار",
      FactoryID: "1122334455",
      FactoryCode: "FAC003",
      PhoneNumber: "09131112222",
      ProvinceName: "فارس",
      CityName: "شیراز",
      Address: "بلوار چمران، پلاک 10",
      Location: "29.5918, 52.5836",
      PostalCode: "2233445566",
      FactoryStatus: "فعال",
      PlateReaderCode: "PLR003",
      WeightReaderCode: "WRC003"
    },
    {
      FactoryName: "کارخانه آرد زاگرس",
      FactoryID: "5566778899",
      FactoryCode: "FAC004",
      PhoneNumber: "09142223344",
      ProvinceName: "کردستان",
      CityName: "سنندج",
      Address: "خیابان امام، پلاک 5",
      Location: "35.3129, 46.9961",
      PostalCode: "4455667788",
      FactoryStatus: "غیرفعال",
      PlateReaderCode: "PLR004",
      WeightReaderCode: "WRC004"
    },
    {
      FactoryName: "کارخانه آرد خوزستان",
      FactoryID: "6677889900",
      FactoryCode: "FAC005",
      PhoneNumber: "09151234567",
      ProvinceName: "خوزستان",
      CityName: "اهواز",
      Address: "خیابان کیانپارس، پلاک 8",
      Location: "31.3183, 48.6706",
      PostalCode: "5566778899",
      FactoryStatus: "فعال",
      PlateReaderCode: "PLR005",
      WeightReaderCode: "WRC005"
    },
  ];
  
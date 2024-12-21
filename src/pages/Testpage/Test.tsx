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

import { ArrowBigLeft, ArrowLeft, ArrowLeftIcon, ChevronLeft, LeafIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadCrumbProps {
    title: string;
    pageTitle: string;
}
const BreadCrumb = ({ title, pageTitle }: BreadCrumbProps) => {

    document.title = `${title} / ${pageTitle}`;

    return (
        <React.Fragment>

<div className="w-full py-5 border border-sky-200 rounded-md p-4 my-4">
  <div className="flex justify-between">
    <div className="flex items-center text-base sm:text-sm">
      {title} <ChevronLeft size={18} className="mx-1" /> 
      <span className="hidden sm:block">{pageTitle}</span>
    </div>
    <div className="text-base sm:text-sm">{pageTitle}</div>
  </div>
</div>



            {/* <div className="flex  flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
                 <div className="grow">
                    <h5 className="text-16">{title}</h5>
                </div>
                  <ul className="flex items-center gap-2 text-sm font-normal shrink-0">
                    <li className="relative  before:content-['\ea54'] before:font-remix ltr:before:-right-1 rtl:before:-left-1  before:absolute before:text-[18px] before:-top-[3px] ltr:pr-4 rtl:pl-4 before:text-slate-400 dark:text-zink-200">
                        <Link to="#" className="text-slate-400 dark:text-zink-200">{pageTitle}</Link>
                    </li>
                    <li className="text-slate-700 dark:text-zink-100">
                        {title}
                    </li>
                </ul> 
            
            </div> */}
        </React.Fragment>
    );
};

export default BreadCrumb;
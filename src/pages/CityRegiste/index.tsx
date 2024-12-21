

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BreadCrumb from 'Common/BreadCrumb';

import { Search, Plus, Trash2 } from 'lucide-react';
import TableContainer from 'Common/TableContainer';
import { Link } from 'react-router-dom';

import DeleteModal from 'Common/DeleteModal';
import Modal from 'Common/Components/Modal';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
// react-redux
import { useDispatch, useSelector } from 'react-redux';
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import {
    getEmployee as onGetEmployee,
    deleteEmployee as onDeleteEmployee
} from 'slices/thunk';

type CityData = {
  ProvinceName: string;
  CityName: string;
  CityCode: string;
};
const Index = () => {
    // const dispatch = useDispatch<any>()

    const [City, setCity] = useState<CityData[]>([
        { ProvinceName: "تهران", CityName: "شهریار", CityCode: "101" },
        { ProvinceName: "خراسان رضوی", CityName: "مشهد", CityCode: "102" },
        { ProvinceName: "فارس", CityName: "شیراز", CityCode: "103" },
        { ProvinceName: "اصفهان", CityName: "کاشان", CityCode: "104" },
        { ProvinceName: "مازندران", CityName: "ساری", CityCode: "105" },
    ]);
    
      
  

 
    // const { dataList } = useSelector(selectDataList);
    const [data, setData] = useState<any>([]);
    const [eventData, setEventData] = useState<any>();

    const [show, setShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

   

    // Get Data
    useEffect(() => {
        // dispatch(onGetEmployee());
        setData(City)
    }, []);
  
    // useEffect(() => {
    // }, [dataList]);
    // Delete Modal
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const deleteToggle = () => setDeleteModal(!deleteModal);

    // Delete Data
    const onClickDelete = (cell: any) => {
        setDeleteModal(true);
        if (cell.id) {
            setEventData(cell);
        }
    };

    const handleDelete = () => {
        if (eventData) {
            // dispatch(onDeleteEmployee(eventData?.id));
            setDeleteModal(false);
        }
    };
    // 


    // validation
    const validation: any = useFormik({
        enableReinitialize: true,
        initialValues: {
          province: eventData?.province || '',  // نام استان
          city: eventData?.city || '',  // نام شهرستان
          cityCode: eventData?.cityCode || '',  // کد شهرستان
          status: eventData?.status || ''
        },
        validationSchema: Yup.object({
          province: Yup.string().required('لطفاً نام استان را وارد کنید'),
          city: Yup.string().required('لطفاً نام شهرستان را وارد کنید'),
          cityCode: Yup.string().required('لطفاً کد شهرستان را وارد کنید'),
          status: Yup.string().required('وضعیت را وارد کنید')
        }),
        onSubmit: (values) => {
            const newData = {
              ...values,
            };
                  toast.success("شهرستان مورد نظر ثبت شد");
            console.log("city item " , values);
          toggle();
        },
      });
      
      
    // 
    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            setEventData("");
            setIsEdit(false);
       
        } else {
            setShow(true);
            setEventData("");
            validation.resetForm();
        }
    }, [show, validation]);

  // دیتا اصلی
  const columns = useMemo(() => [
    {
      header: "نام استان",
      accessorKey: "ProvinceName",
      enableColumnFilter: false,
      cell: (cell: any) => (
        <span className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600">
          {cell.getValue()}
        </span>
      ),
    },
    {
      header: "نام شهرستان",
      accessorKey: "CityName",
      enableColumnFilter: false,
      cell: (cell: any) => (
        <span className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600">
          {cell.getValue()}
        </span>
      ),
    },
    {
      header: "کد شهرستان",
      accessorKey: "CityCode",
      enableColumnFilter: false,
      cell: (cell: any) => (
        <span className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600">
          {cell.getValue()}
        </span>
      ),
    },
    {
      header: "عملیات",
      enableColumnFilter: false,
      enableSorting: true,
      cell: (cell: any) => (
        <div className="flex gap-3">
          {/* <Link
            to="#!"
            data-modal-target="editModal"
            className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 text-slate-500 hover:text-custom-500 hover:bg-custom-100 dark:bg-zink-600 dark:text-zink-200 dark:hover:bg-custom-500/20 dark:hover:text-custom-500"
            onClick={() => {
              const data = cell.row.original;
              handleUpdateDataClick(data);
            }}
          >
            <Pencil className="size-4" />
          </Link> */}
          <Link
            to="#!"
            className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 text-slate-500 hover:text-custom-500 hover:bg-custom-100 dark:bg-zink-600 dark:text-zink-200 dark:hover:bg-custom-500/20 dark:hover:text-custom-500"
            onClick={() => {
              const data = cell.row.original;
              onClickDelete(data);
            }}
          >
            <Trash2 className="size-4" />
          </Link>
        </div>
      ),
    },
  ], []);
  

    return (
        <React.Fragment>
            <BreadCrumb   pageTitle='ثبت شهرستان' title='داده های اولیه'/>
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="card" id="employeeTable rtl">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-4">
                        {/* کارخانه ها تعداد کلی  */}
                        {/* <h6 className="text-15 grow">Employee (<b className="total-Employs">{data.length}</b>)</h6> */}
                        <div className="shrink-0">
                            <Link to="#!" data-modal-target="addEmployeeModal" type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20 add-employee" onClick={toggle}>
                               <span className="align-middle rtl">ثبت شهرستان</span>   <Plus className="inline-block size-4 rtl" />
                            </Link>
                        </div>
                    </div>
                    {data && data?.length > 0 ?
                        <TableContainer
                            isPagination={true}
                            columns={(columns || [])}
                            data={(data || [])}
                            customPageSize={10} 
                            // تعداد صفحه بندی
                            divclassName="-mx-5 overflow-x-auto"
                            tableclassName="w-full whitespace-nowrap"
                            theadclassName="ltr:text-left rtl:text-right bg-slate-100 dark:bg-zink-600"
                            thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-b border-slate-200 dark:border-zink-500"
                            tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
                            PaginationClassName="flex flex-col items-center gap-4 px-4 mt-4 md:flex-row"
                        />
                        :
                        (<div className="noresult">
                            <div className="py-6 text-center">
                                <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                                <h5 className="mt-2 mb-1">اطلاعاتی یافت نشد</h5>
                                {/* <p className="mb-0 text-slate-500 dark:text-zink-200">We've searched more than 299+ Employee We did not find any Employee for you search.</p> */}
                            </div>
                        </div>)}
                </div>
            </div>

            {/* Employee Modal */}

            <Modal
  show={show}
  onHide={toggle}
  modal-center="true"
  className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
  dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
>
  <Modal.Header
    className="flex items-center justify-between p-4 border-b dark:border-zink-500"
    closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
  >
    <Modal.Title className="text-16">افزودن شهرستان</Modal.Title>
  </Modal.Header>
  <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
    <form
      className="create-form"
      id="create-form"
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <input type="hidden" value="" name="id" id="id" />
      <input type="hidden" value="add" name="action" id="action" />
      <input type="hidden" id="id-field" />
      <div id="alert-error-msg" className="hidden px-4 py-3 text-sm text-red-500 border border-transparent rounded-md bg-red-50 dark:bg-red-500/20"></div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        {[
          { id: "province", label: "نام استان" },
          { id: "city", label: "نام شهرستان" },
          { id: "cityCode", label: "کد شهرستان" },
          { id: "status", label: "وضعیت" },
        ].map(({ id, label }) => (
          <div key={id} className="xl:col-span-6">
            <label htmlFor={id} className="inline-block mr-1 mb-2 text-base font-medium">
              {label}
            </label>
            <input
              type="text"
              id={id}
              className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
              placeholder={`وارد کردن ${label}`}
              name={id}
              onChange={validation.handleChange}
              value={validation.values[id] || ""}
            />
            {validation.touched[id] && validation.errors[id] && (
              <p className="text-red-400 mt-1">{validation.errors[id]}</p>
            )}
          </div>
        ))}
      </div>
      <div className="xl:col-span-12 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 mt-4 font-bold justify-end text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          ثبت
        </button>
      </div>
    </form>
  </Modal.Body>
</Modal>
        </React.Fragment>
    );
};

export default Index;






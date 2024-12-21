
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BreadCrumb from 'Common/BreadCrumb';
import Flatpickr from "react-flatpickr";
import moment from "moment";

// Icons
import { Search, Plus, Trash2, Eye, Pencil, ImagePlus } from 'lucide-react';

import dummyImg from "assets/images/users/user-dummy-img.jpg";

import TableContainer from 'Common/TableContainer';
import { Link } from 'react-router-dom';

import DeleteModal from 'Common/DeleteModal';
import Modal from 'Common/Components/Modal';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import {
    getEmployee as onGetEmployee,
    addEmployee as onAddEmployee,
    updateEmployee as onUpdateEmployee,
    deleteEmployee as onDeleteEmployee
} from 'slices/thunk';
import { ToastContainer } from 'react-toastify';


const Index = () => {
    const dispatch = useDispatch<any>();
    const selectDataList = createSelector(
        (state: any) => state.HRManagment,
        (state) => ({
            dataList: state.employeelist
        })
    );
  
    const [provinces, setProvinces] = useState<Province[]>([
        { id: "1", name: "لرستان" },
      ]);
      const [cities, setCities] = useState<City[]>([
        { id: "1", name: "خرم‌آباد" },
      ]);
  const [selectedProvince, setSelectedProvince] = useState("");
    type Province = {
        id: string;
        name: string;
      };
      
      type City = {
        id: string;
        name: string;
      };

    useEffect(() => {
        const fetchProvinces = async () => {
          try {
            const response = await fetch("API_URL/provinces");
            const data = await response.json();
            setProvinces(data);
          } catch (error) {
            console.error("Error fetching provinces:", error);
          }
        };
        fetchProvinces();
      }, []);

     const fetchCities = async (provinceId: string) => {
  try {
    const response = await fetch(`API_URL/cities?provinceId=${provinceId}`);
    const data = await response.json();
    return data.name; // فرض بر این است که `data` شامل آرایه‌ای از اشیاء با `id` و `name` است
  } catch (error) {
    console.error(error);
  }
};
      
  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    fetchCities(provinceId);
  };

 
    const { dataList } = useSelector(selectDataList);
    const [data, setData] = useState<any>([]);
    const [eventData, setEventData] = useState<any>();

    const [show, setShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    // Image
    const [selectedImage, setSelectedImage] = useState<any>();

    const handleImageChange = (event: any) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                validation.setFieldValue('img', e.target.result);
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Get Data
    useEffect(() => {
        dispatch(onGetEmployee());
    }, [dispatch]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);

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
            dispatch(onDeleteEmployee(eventData?.id));
            setDeleteModal(false);
        }
    };
    // 

    // Update Data
    const handleUpdateDataClick = (ele: any) => {
      console.log("👱‍♂️", ele);
        setEventData({ ...ele });
        setIsEdit(true);
        setShow(true);
    };

    // validation
    const validation: any = useFormik({
        enableReinitialize: true,
        initialValues: {
          factoryCode: (eventData && eventData.factoryCode) || '',
          // contactNumber: (eventData && eventData.contactNumber) || '',
          contactNumber: (eventData?.contactNumber || '').toString(),
          province: (eventData && eventData.province) || '',
          city: (eventData && eventData.city) || '',
          address: (eventData && eventData.address) || '',
          location: (eventData && eventData.location) || '',
          postalCode: (eventData && eventData.postalCode) || '',
          status: (eventData && eventData.status) || '',
          plateReaderCode: (eventData && eventData.plateReaderCode) || '',
          scaleReaderCode: (eventData && eventData.scaleReaderCode) || '',
        },
        validationSchema: Yup.object({
            factoryCode: Yup.string().required("لطفاً کد کارخانه را وارد کنید"),
            contactNumber: Yup.string().required("لطفاً شماره تماس را وارد کنید"),
            province: Yup.string().required("لطفاً استان را وارد کنید"),
            city: Yup.string().required("لطفاً شهرستان را وارد کنید"),
            address: Yup.string().required("لطفاً آدرس را وارد کنید"),
            location: Yup.string().required("لطفاً موقعیت مکانی را وارد کنید"),
            postalCode: Yup.string().required("لطفاً کد پستی را وارد کنید"),
            status: Yup.string().required("لطفاً وضعیت را مشخص کنید"),
            plateReaderCode: Yup.string().required("لطفاً کد پلاک‌خوان را وارد کنید"),
            scaleReaderCode: Yup.string().required("لطفاً کد باسکول‌خوان را وارد کنید"),
          }),
      
        onSubmit: (values) => {
          if (isEdit) {
            const updateData = {
              id: eventData ? eventData.id : 0,
              ...values,
            };
            // update user
            dispatch(onUpdateEmployee(updateData));
          } else {
            const newData = {
              ...values,
              // id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
              // factoryCode: "#FAC" + (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
            };
            // save new user
            console.log("👩‍🦱👩‍🦱👨‍🦰 new data", newData);
            dispatch(onAddEmployee(newData));
          }
          toggle();
        },
      });
    // 
    const toggle = useCallback(() => {
        if (show) {
            setShow(false);
            setEventData("");
            setIsEdit(false);
            setSelectedImage("");
        } else {
            setShow(true);
            setEventData("");
            setSelectedImage("");
            validation.resetForm();
        }
    }, [show, validation]);

    // columns
    // سر تیتر هااااا افزدون کارخانه
    const columns = useMemo(() => [
        {
            header: " نام کارخانه آرد",
            accessorKey: "FactoryName",
            enableColumnFilter: false,
            cell: (cell: any) => (
                <Link to="#!" className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600">{cell.getValue()}</Link>
            ),
        },
        {
            header: "شناسه ملی",
            accessorKey: "FactoryID",
            enableColumnFilter: false,
            // برای تنظیم عکس پیش فرض 
            // cell: (cell: any) => (
            //     <Link to="#!" className="flex items-center gap-3">
            //         <div className="size-6 rounded-full shrink-0 bg-slate-100">
            //             <img src={cell.row.original.img} alt="" className="h-6 rounded-full" />
            //         </div>
            //         <h6 className="grow">{cell.getValue()}</h6>
            //     </Link>
            // ),
        },
        {
            header: "کد کارخانه",
            accessorKey: "FactoryCode",
            enableColumnFilter: false
        },
        {
            header: "شماره تماس",
            accessorKey: "PhoneNumber",
            enableColumnFilter: false,
        },
        {
            header: "استان",
            accessorKey: "ProvinceName",
            enableColumnFilter: false,
        },
        {
            header: "شهرستان",
            accessorKey: "CityName",
            enableColumnFilter: false,
        },
        {
            header: "آدرس",
            accessorKey: "Address",
            enableColumnFilter: false,
        },
        {
            header: "موقعیت مکانی",
            accessorKey: "Location",
            enableColumnFilter: false,
        },
        {
            header: "کد پستی",
            accessorKey: "PostalCode",
            enableColumnFilter: false,
        },
        {
            header: "وضعیت",
            accessorKey: "FactoryStatus",
            enableColumnFilter: false,
        },
        {
            header: "کد پلاک خوان",
            accessorKey: "PlateReaderCode",
            enableColumnFilter: false,
        },
        {
            header: "کد باسکول خوان",
            accessorKey: "WeightReaderCode",
            enableColumnFilter: false,
        },
        {
            header: "عملیات",
            enableColumnFilter: false,
            enableSorting: true,
            cell: (cell: any) => (
                <div className="flex gap-3">
                    {/* <Link className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 text-slate-500 hover:text-custom-500 hover:bg-custom-100 dark:bg-zink-600 dark:text-zink-200 dark:hover:bg-custom-500/20 dark:hover:text-custom-500" to="/pages-account"><Eye className="inline-block size-3" /> </Link> */}
                    <Link to="#!" data-modal-target="addEmployeeModal" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md edit-item-btn bg-slate-100 text-slate-500 hover:text-custom-500 hover:bg-custom-100 dark:bg-zink-600 dark:text-zink-200 dark:hover:bg-custom-500/20 dark:hover:text-custom-500" onClick={() => {
                        const data = cell.row.original;
                        handleUpdateDataClick(data);
                    }}>
                     <Pencil className="size-4" /></Link>
                    <Link to="#!" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md remove-item-btn bg-slate-100 text-slate-500 hover:text-custom-500 hover:bg-custom-100 dark:bg-zink-600 dark:text-zink-200 dark:hover:bg-custom-500/20 dark:hover:text-custom-500" onClick={() => {
                        const data = cell.row.original;
                        onClickDelete(data);
                    }}><Trash2 className="size-4" /></Link>
                </div>
            ),
        }
    ], []
    );

    return (
        <React.Fragment>
            <BreadCrumb   pageTitle='مدیریت کارخانجات آرد' title='کارخانجات آرد'/>
            <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
            <ToastContainer closeButton={false} limit={1} />
            <div className="card" id="employeeTable rtl">
                <div className="card-body">
                    <div className="flex items-center gap-3 mb-4">
                        {/* کارخانه ها تعداد کلی  */}
                        {/* <h6 className="text-15 grow">Employee (<b className="total-Employs">{data.length}</b>)</h6> */}
                        <div className="shrink-0">
                            <Link to="#!" data-modal-target="addEmployeeModal" type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20 add-employee" onClick={toggle}>
                               <span className="align-middle rtl">ثبت کارخانه جدید</span>   <Plus className="inline-block size-4 rtl" />
                            </Link>
                        </div>
                    </div>
                    {data && data.length > 0 ?
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
    <Modal.Title className="text-16">{!!isEdit ? "به روز رسانی اطلاعات" : "اضافه کردن کارخانه جدید"}</Modal.Title>
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
          { id: "factoryname", label: "نام کارخانه" },
          { id: "factoryCode", label: "شناسه ملی" },
          { id: "contactNumber", label: "کد کارخانه" },
          { id: "address", label: "شماره تماس" },
          { id: "location", label: "آدرس" },
          { id: "postalCode", label: "موقعیت مکانی" },
          { id: "status", label: "کد پستی" },
          { id: "plateReaderCode", label: "وضعیت" },
          { id: "scaleReaderCode", label: "کد پلاک خوان" },
          { id: "WieghtReaderCode", label: "کد باسکول خوان" },
          // استان  
          // شهرستان
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
            {validation.touched[id] && validation?.errors[id] ? (
              <p className="text-red-400">{validation?.errors[id]}</p>
            ) : null}
          </div>
        ))}
        {/* استان */}
        <div className="xl:col-span-6 ">
          <label htmlFor="province" className=" border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 inline-block mb-2 text-base font-medium">
            استان
          </label>
          <select
            id="province"
            className="form-select dark:bg-[#132337] dark:text-white border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500"
            name="province"
            onChange={(e) => {
              validation.handleChange(e);
              // fetch cities based on selected province
              fetchCities(e.target.value);
            }}
            value={validation.values.province || ""}
          >
            <option value="">انتخاب استان</option>
            {provinces.map((province) => (
              <option className='dark:bg-[#1C2E45]dark:text-white' key={province.id} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
          {validation.touched.province && validation.errors.province ? (
            <p className="text-red-400">{validation.errors.province}</p>
          ) : null}
        </div>
        {/* شهرستان */}
        <div className="xl:col-span-6  dark:text-white">
          <label htmlFor="city" className="inline-block mb-2 text-base font-medium">
            شهرستان
          </label>
          <select
            id="city"
            className="form-select dark:bg-[#132337] dark:text-white border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500"
            name="city"
            onChange={validation.handleChange}
            value={validation.values.city || ""}
          >
            <option value="">انتخاب شهرستان</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name} className='bg-[#1C2E45] text-white border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200'>
                {city.name}
              </option>
            ))}
          </select>
          {validation.touched.city && validation.errors.city ? (
            <p className="text-red-400">{validation.errors.city}</p>
          ) : null}
        </div>
      </div>
      <div className="xl:col-span-12 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 mt-4 font-bold justify-end text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {!!isEdit ? "بروز رسانی " : " ثبت"}
        </button>
      </div>
    </form>
  </Modal.Body>
</Modal>


        </React.Fragment>
    );
};

export default Index;










// // new whith no api city 
// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import BreadCrumb from 'Common/BreadCrumb';
// import Flatpickr from "react-flatpickr";
// import moment from "moment";

// // Icons
// import { Search, Plus, Trash2, Eye, Pencil, ImagePlus } from 'lucide-react';

// import dummyImg from "assets/images/users/user-dummy-img.jpg";

// import TableContainer from 'Common/TableContainer';
// import { Link } from 'react-router-dom';

// import DeleteModal from 'Common/DeleteModal';
// import Modal from 'Common/Components/Modal';

// // react-redux
// import { useDispatch, useSelector } from 'react-redux';
// import { createSelector } from 'reselect';

// // Formik
// import * as Yup from "yup";
// import { useFormik } from "formik";

// import {
//     getEmployee as onGetEmployee,
//     addEmployee as onAddEmployee,
//     updateEmployee as onUpdateEmployee,
//     deleteEmployee as onDeleteEmployee
// } from 'slices/thunk';
// import { ToastContainer } from 'react-toastify';

// const Index = () => {
//     const dispatch = useDispatch<any>();
//     const selectDataList = createSelector(
//         (state: any) => state.HRManagment,
//         (state) => ({
//             dataList: state.employeelist
//         })
//     );
    
//     const { dataList } = useSelector(selectDataList);
//     const [data, setData] = useState<any>([]);
//     const [eventData, setEventData] = useState<any>();

//     const [show, setShow] = useState<boolean>(false);
//     const [isEdit, setIsEdit] = useState<boolean>(false);

//     // Image
//     const [selectedImage, setSelectedImage] = useState<any>();

//     const handleImageChange = (event: any) => {
//         const fileInput = event.target;
//         if (fileInput.files && fileInput.files.length > 0) {
//             const file = fileInput.files[0];
//             const reader = new FileReader();
//             reader.onload = (e: any) => {
//                 validation.setFieldValue('img', e.target.result);
//                 setSelectedImage(e.target.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Get Data
//     useEffect(() => {
//         dispatch(onGetEmployee());
//     }, [dispatch]);

//     useEffect(() => {
//         setData(dataList);
//     }, [dataList]);

//     // Delete Modal
//     const [deleteModal, setDeleteModal] = useState<boolean>(false);
//     const deleteToggle = () => setDeleteModal(!deleteModal);

//     // Delete Data
//     const onClickDelete = (cell: any) => {
//         setDeleteModal(true);
//         if (cell.id) {
//             setEventData(cell);
//         }
//     };

//     const handleDelete = () => {
//         if (eventData) {
//             dispatch(onDeleteEmployee(eventData.id));
//             setDeleteModal(false);
//         }
//     };
//     // 

//     // Update Data
//     const handleUpdateDataClick = (ele: any) => {
//         setEventData({ ...ele });
//         setIsEdit(true);
//         setShow(true);
//     };

//     // validation
//     const validation: any = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//           factoryCode: (eventData && eventData.factoryCode) || '',
//           contactNumber: (eventData && eventData.contactNumber) || '',
//           province: (eventData && eventData.province) || '',
//           city: (eventData && eventData.city) || '',
//           address: (eventData && eventData.address) || '',
//           location: (eventData && eventData.location) || '',
//           postalCode: (eventData && eventData.postalCode) || '',
//           status: (eventData && eventData.status) || '',
//           plateReaderCode: (eventData && eventData.plateReaderCode) || '',
//           scaleReaderCode: (eventData && eventData.scaleReaderCode) || '',
//         },
//         validationSchema: Yup.object({
//           factoryCode: Yup.string().required("Please Enter Factory Code"),
//           contactNumber: Yup.string().required("Please Enter Contact Number"),
//           province: Yup.string().required("Please Enter Province"),
//           city: Yup.string().required("Please Enter City"),
//           address: Yup.string().required("Please Enter Address"),
//           location: Yup.string().required("Please Enter Location"),
//           postalCode: Yup.string().required("Please Enter Postal Code"),
//           status: Yup.string().required("Please Enter Status"),
//           plateReaderCode: Yup.string().required("Please Enter Plate Reader Code"),
//           scaleReaderCode: Yup.string().required("Please Enter Scale Reader Code"),
//         }),
//         onSubmit: (values) => {
//           if (isEdit) {
//             const updateData = {
//               id: eventData ? eventData.id : 0,
//               ...values,
//             };
//             // update user
//             dispatch(onUpdateEmployee(updateData));
//           } else {
//             const newData = {
//               ...values,
//               id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
//               factoryCode: "#FAC" + (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
//             };
//             // save new user
//             console.log("👩‍🦱👩‍🦱👨‍🦰 new data", newData);
//             dispatch(onAddEmployee(newData));
//           }
//           toggle();
//         },
//       });
//     // 
//     const toggle = useCallback(() => {
//         if (show) {
//             setShow(false);
//             setEventData("");
//             setIsEdit(false);
//             setSelectedImage("");
//         } else {
//             setShow(true);
//             setEventData("");
//             setSelectedImage("");
//             validation.resetForm();
//         }
//     }, [show, validation]);

//     // columns
//     // سر تیتر هااااا افزدون کارخانه
//     const columns = useMemo(() => [
//         {
//             header: " نام کارخانه آرد",
//             accessorKey: "FactoryName",
//             enableColumnFilter: false,
//             cell: (cell: any) => (
//                 <Link to="#!" className="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600">{cell.getValue()}</Link>
//             ),
//         },
//         {
//             header: "شناسه ملی",
//             accessorKey: "FactoryID",
//             enableColumnFilter: false,
//             // برای تنظیم عکس پیش فرض 
//             // cell: (cell: any) => (
//             //     <Link to="#!" className="flex items-center gap-3">
//             //         <div className="size-6 rounded-full shrink-0 bg-slate-100">
//             //             <img src={cell.row.original.img} alt="" className="h-6 rounded-full" />
//             //         </div>
//             //         <h6 className="grow">{cell.getValue()}</h6>
//             //     </Link>
//             // ),
//         },
//         {
//             header: "کد کارخانه",
//             accessorKey: "FactoryCode",
//             enableColumnFilter: false
//         },
//         {
//             header: "شماره تماس",
//             accessorKey: "PhoneNumber",
//             enableColumnFilter: false,
//         },
//         {
//             header: "استان",
//             accessorKey: "ProvinceName",
//             enableColumnFilter: false,
//         },
//         {
//             header: "شهرستان",
//             accessorKey: "CityName",
//             enableColumnFilter: false,
//         },
//         {
//             header: "آدرس",
//             accessorKey: "Address",
//             enableColumnFilter: false,
//         },
//         {
//             header: "موقعیت مکانی",
//             accessorKey: "Location",
//             enableColumnFilter: false,
//         },
//         {
//             header: "کد پستی",
//             accessorKey: "PostalCode",
//             enableColumnFilter: false,
//         },
//         {
//             header: "وضعیت",
//             accessorKey: "FactoryStatus",
//             enableColumnFilter: false,
//         },
//         {
//             header: "کد پلاک خوان",
//             accessorKey: "PlateReaderCode",
//             enableColumnFilter: false,
//         },
//         {
//             header: "کد باسکول خوان",
//             accessorKey: "WeightReaderCode",
//             enableColumnFilter: false,
//         },
//         {
//             header: "عملیات",
//             enableColumnFilter: false,
//             enableSorting: true,
//             cell: (cell: any) => (
//                 <div className="flex gap-3">
//                     {/* <Link className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md bg-slate-100 text-slate-500 hover:text-custom-500 hover:bg-custom-100 dark:bg-zink-600 dark:text-zink-200 dark:hover:bg-custom-500/20 dark:hover:text-custom-500" to="/pages-account"><Eye className="inline-block size-3" /> </Link> */}
//                     <Link to="#!" data-modal-target="addEmployeeModal" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md edit-item-btn bg-slate-100 text-slate-500 hover:text-custom-500 hover:bg-custom-100 dark:bg-zink-600 dark:text-zink-200 dark:hover:bg-custom-500/20 dark:hover:text-custom-500" onClick={() => {
//                         const data = cell.row.original;
//                         handleUpdateDataClick(data);
//                     }}>
//                      <Pencil className="size-4" /></Link>
//                     <Link to="#!" className="flex items-center justify-center size-8 transition-all duration-200 ease-linear rounded-md remove-item-btn bg-slate-100 text-slate-500 hover:text-custom-500 hover:bg-custom-100 dark:bg-zink-600 dark:text-zink-200 dark:hover:bg-custom-500/20 dark:hover:text-custom-500" onClick={() => {
//                         const data = cell.row.original;
//                         onClickDelete(data);
//                     }}><Trash2 className="size-4" /></Link>
//                 </div>
//             ),
//         }
//     ], []
//     );

//     return (
//         <React.Fragment>
//             <BreadCrumb title='کارخانجات آرد'  pageTitle='مدیریت کارخانجات آرد'/>
//             <DeleteModal show={deleteModal} onHide={deleteToggle} onDelete={handleDelete} />
//             <ToastContainer closeButton={false} limit={1} />
//             <div className="card" id="employeeTable rtl">
//                 <div className="card-body">
//                     <div className="flex items-center gap-3 mb-4">
//                         {/* کارمندان تعداد کلی  */}
//                         {/* <h6 className="text-15 grow">Employee (<b className="total-Employs">{data.length}</b>)</h6> */}
//                         <div className="shrink-0">
//                             <Link to="#!" data-modal-target="addEmployeeModal" type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20 add-employee" onClick={toggle}>
//                                <span className="align-middle rtl">ثبت کارخانه جدید</span>   <Plus className="inline-block size-4 rtl" />
//                             </Link>
//                         </div>
//                     </div>
//                     {data && data.length > 0 ?
//                         <TableContainer
//                             isPagination={true}
//                             columns={(columns || [])}
//                             data={(data || [])}
//                             customPageSize={7} 
//                             // تعداد صفحه بندی
//                             divclassName="-mx-5 overflow-x-auto"
//                             tableclassName="w-full whitespace-nowrap"
//                             theadclassName="ltr:text-left rtl:text-right bg-slate-100 dark:bg-zink-600"
//                             thclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 font-semibold border-b border-slate-200 dark:border-zink-500"
//                             tdclassName="px-3.5 py-2.5 first:pl-5 last:pr-5 border-y border-slate-200 dark:border-zink-500"
//                             PaginationClassName="flex flex-col items-center gap-4 px-4 mt-4 md:flex-row"
//                         />
//                         :
//                         (<div className="noresult">
//                             <div className="py-6 text-center">
//                                 <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
//                                 <h5 className="mt-2 mb-1">اطلاعاتی یافت نشد</h5>
//                                 {/* <p className="mb-0 text-slate-500 dark:text-zink-200">We've searched more than 299+ Employee We did not find any Employee for you search.</p> */}
//                             </div>
//                         </div>)}
//                 </div>
//             </div>

//             {/* Employee Modal */}
//             <Modal
//   show={show}
//   onHide={toggle}
//   modal-center="true"
//   className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
//   dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600"
// >
//   <Modal.Header
//     className="flex items-center justify-between p-4 border-b dark:border-zink-500"
//     closeButtonClass="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
//   >
//     <Modal.Title className="text-16">{!!isEdit ? "به روز رسانی اطلاعات" : "اضافه کردن کارخانه جدید"}</Modal.Title>
//   </Modal.Header>
//   <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
//     <form
//       className="create-form"
//       id="create-form"
//       onSubmit={(e) => {
//         e.preventDefault();
//         validation.handleSubmit();
//         return false;
//       }}
//     >
//       <input type="hidden" value="" name="id" id="id" />
//       <input type="hidden" value="add" name="action" id="action" />
//       <input type="hidden" id="id-field" />
//       <div id="alert-error-msg" className="hidden px-4 py-3 text-sm text-red-500 border border-transparent rounded-md bg-red-50 dark:bg-red-500/20"></div>
//       <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
//         {[
//           { id: "factoryCode", label: "کد کارخانه" },
//           { id: "contactNumber", label: "شماره تماس" },
//           { id: "province", label: "استان" },
//           { id: "city", label: "شهرستان" },
//           { id: "address", label: "آدرس" },
//           { id: "location", label: "موقعیت مکانی" },
//           { id: "postalCode", label: "کد پستی" },
//           { id: "status", label: "وضعیت" },
//           { id: "plateReaderCode", label: "کد پلاک خوان" },
//           { id: "scaleReaderCode", label: "کد باسکول خوان" }
//         ].map(({ id, label }) => (
//           <div key={id} className="xl:col-span-12">
//             <label htmlFor={id} className="inline-block mb-2 text-base font-medium">
//               {label}
//             </label>
//             <input
//               type="text"
//               id={id}
//               className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
//               placeholder={`وارد کردن ${label}`}
//               name={id}
//               onChange={validation.handleChange}
//               value={validation.values[id] || ""}
//             />
//             {validation.touched[id] && validation.errors[id] ? (
//               <p className="text-red-400">{validation.errors[id]}</p>
//             ) : null}
//           </div>
//         ))}
//       </div>
//       <div className="xl:col-span-12 flex justify-end">
//         <button
//           type="submit"
//           className="px-4 py-2 mt-4 font-bold justify-end text-white bg-blue-500 rounded hover:bg-blue-600"
//         >
//           {!!isEdit ? "بروز رسانی " : " ثبت"}
//         </button>
//       </div>
//     </form>
//   </Modal.Body>
// </Modal>

//         </React.Fragment>
//     );
// };

// export default Index;










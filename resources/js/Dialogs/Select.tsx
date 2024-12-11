// import React from 'react'

import { Button } from "@/Components/ui/button";
import SelectDesignation from "@/Components/ui/selectDropdown";
// import { Select } from "@headlessui/react";
import { Ghost } from "lucide-react";
import React, { useState } from "react";




const Select = () => {
    const [ selected, setSelected] = useState("Agusan Del Sur");
  return (
    <div className='flex justify-center items-center '>
        <div className='w-[1250px] h-[410px] bg-white overflow-hidden'>
            <form action="">
            <div  className='max-w-full h-full px-6 gap-y-6 pt-4' >
                <div className='max-w-fit gap-x-2 flex'>
                    <span className='font-medium'>Selected:</span>
                    <h1 className='font-semibold'>Employee Name</h1>
                </div>
                <div className='max-w-full h-[270px] bg-baseGrey drop-shadow-custom mt-4 rounded p-3 px-5'>
                    <div className='flex justify-between'>
                        <div>
                            <span>Last Name:</span>
                            <div className='pt-2'>
                                <input type="text" placeholder='Last Name' className='border-1 border-zinc-400 rounded-sm w-64' />
                            </div>
                        </div>
                        <div>
                            <span>First Name:</span>
                            <div className='pt-2'>
                                <input type="text" placeholder='First Name' className='border-1 border-zinc-400 rounded-sm w-64' />
                            </div>
                        </div>
                        <div>
                            <span>Middle Name:</span>
                            <div className='pt-2'>
                                <input type="text" placeholder='Middle Name' className='border-1 border-zinc-400 rounded-sm w-64' />
                            </div>
                        </div>
                        <div>
                            <span>Ext. Name:</span>
                            <div className='pt-2'>
                                <input type="text" placeholder='Ext. Name' className='border-1 border-zinc-400 rounded-sm w-64' />
                            </div>
                        </div>
                    </div>  
                    <div className='mt-4 flex justify-between'>
                        <div>
                            <span>Official Station:</span>
                            <SelectDesignation placeholder="Agusan Del Sur" selectValue={["Agusan Del Sur", "Agusan Del Norte", "Surigao Del Sur", "Surigao del Norte",]} setSelected={setSelected}/>
                        </div>
                        <div>
                            <span>Cost Center:</span>
                            <SelectDesignation placeholder="Agusan Del Sur" selectValue={["Agusan Del Sur", "Agusan Del Norte", "Surigao Del Sur", "Surigao del Norte",]} setSelected={setSelected}/>
                        </div>
                        <div>
                            <span>Appoinment:</span>
                            <SelectDesignation placeholder="Agusan Del Sur" selectValue={["Agusan Del Sur", "Agusan Del Norte", "Surigao Del Sur", "Surigao del Norte",]} setSelected={setSelected}/>
                        </div>
                        <div>
                            <span>Position:</span>
                            <SelectDesignation placeholder="Agusan Del Sur" selectValue={["Agusan Del Sur", "Agusan Del Norte", "Surigao Del Sur", "Surigao del Norte",]} setSelected={setSelected}/>
                        </div>
                        <div>
                            <span>Salary Type:</span>
                            <SelectDesignation placeholder="Agusan Del Sur" selectValue={["Agusan Del Sur", "Agusan Del Norte", "Surigao Del Sur", "Surigao del Norte",]} setSelected={setSelected}/>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <p>Employee #:</p>
                            <input type="text" placeholder='Last Name' className='border-1 border-zinc-400 rounded-sm w-72' />
                        </div>
                        <div>
                            <span>Salary Grade:</span>
                            <SelectDesignation placeholder="Agusan Del Sur" selectValue={["Agusan Del Sur", "Agusan Del Norte", "Surigao Del Sur", "Surigao del Norte",]} setSelected={setSelected}/>
                        </div>
                        <div>
                            <span>Step:</span>
                            <SelectDesignation  placeholder="Agusan Del Sur" selectValue={["Agusan Del Sur", "Agusan Del Norte", "Surigao Del Sur", "Surigao del Norte",]} setSelected={setSelected}/>
                        </div>
                        <div>
                            <p>Salary:</p>
                            <input type="text" placeholder='#########' className='border-1 border-zinc-400 rounded-sm w-72' />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-end gap-4">
                    <Button variant="outline" type="button">Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Select
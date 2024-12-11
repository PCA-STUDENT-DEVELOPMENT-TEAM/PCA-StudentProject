// import React from 'react'
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";


const selectDropdown = ({selectValue, setSelected}:{placeholder:string, selectValue:Array<string>, setSelected:any}) => {
    
    
  return (
    <div>
      <Select>
          <SelectTrigger className="w-[210px] border-2 border-zinc-400 border-opacity-50">
              <SelectValue placeholder="Set Value Here" />
          </SelectTrigger>
          <SelectContent>
              {
                  selectValue.map(designation =>
                      <SelectItem  key={designation} value={designation}>{
                          designation
                      } 
                      <button onClick={() => setSelected(designation)}></button>
                      </SelectItem>
                  ) 
              }
          </SelectContent>
      </Select>
    </div>
  )
}

export default selectDropdown
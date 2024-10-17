"use client";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React, { useState, useEffect } from 'react';

interface AppliedFilter {
    label: string;
    value: string;
    checked?: boolean;
}

interface ShiftTimingProps {
    data: AppliedFilter[];
    selected: string[] ; 
    onChange: (dataValue: string[]) => void;
}

const ShiftTimingFilter = ({ data, selected, onChange }: ShiftTimingProps) => {
    const [filter, setFilter] = useState<AppliedFilter[]>(data || []);

    useEffect(() => {
        const updatedFilter = data.map(item => ({
            ...item,
            checked: selected.includes(item.value), 
        }));
        setFilter(updatedFilter);
    }, [data, selected]);

    const handleChange = (applied: AppliedFilter) => {
        const updatedFilter = filter.map(item => {
            if (item.value === applied.value) {
                return {
                    ...item,
                    checked: !item.checked 
                };
            }
            return item;
        });

        setFilter(updatedFilter);

        const checkedValues = updatedFilter.filter(item => item.checked).map(item => item.value);
        
        onChange(checkedValues);
    };

    return (
        <div className='flex flex-col gap-3'>
            <p className='font-bold'>Working Mode</p>
            {
                filter.map(sdata => (
                    <div key={sdata.value} className="flex items-center space-x-2">
                        <Checkbox
                            id={sdata.value} 
                            checked={sdata.checked} 
                            onCheckedChange={() => handleChange(sdata)}
                        />
                        <Label
                            htmlFor={sdata.value} 
                            className="text-sm font-medium leading-none"
                        >
                            {sdata.label}
                        </Label>
                    </div>
                ))
            }
        </div>
    );
};

export default ShiftTimingFilter;

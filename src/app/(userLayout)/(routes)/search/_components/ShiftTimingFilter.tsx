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

    // Sync with initial data and selected values
    useEffect(() => {
        const updatedFilter = data.map(item => ({
            ...item,
            checked: selected.includes(item.value), // Set checked based on selected
        }));
        setFilter(updatedFilter);
    }, [data, selected]);

    const handleChange = (applied: AppliedFilter) => {
        const updatedFilter = filter.map(item => {
            if (item.value === applied.value) {
                return {
                    ...item,
                    checked: !item.checked // Toggle the checked state
                };
            }
            return item;
        });

        setFilter(updatedFilter);

        // Get the updated checked values
        const checkedValues = updatedFilter.filter(item => item.checked).map(item => item.value);
        
        // Pass the updated checked values to the parent
        onChange(checkedValues);
    };

    return (
        <div className='flex flex-col gap-3'>
            <p className='font-bold'>Working Mode</p>
            {
                filter.map(sdata => (
                    <div key={sdata.value} className="flex items-center space-x-2">
                        <Checkbox
                            id={sdata.value} // Ensure unique ID for each checkbox
                            checked={sdata.checked} // Bind checked state
                            onCheckedChange={() => handleChange(sdata)}
                        />
                        <Label
                            htmlFor={sdata.value} // Ensure the label matches the checkbox ID
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

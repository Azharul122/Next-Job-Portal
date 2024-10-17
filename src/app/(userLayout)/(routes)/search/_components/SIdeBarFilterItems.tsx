"use client";
import React, { useEffect, useState } from 'react';
import DateFilter from './DateFilter';
import { Separator } from '@/components/ui/separator';
import queryString from 'query-string';
import { usePathname, useRouter } from 'next/navigation';
import ShiftTimingFilter from './ShiftTimingFilter';

const SideBarFilterItems = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [selectedShiftTimings, setSelectedShiftTimings] = useState<string[]>([]);
    const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]); // State for work modes

    const shiftTimingData = [
        { label: "Full time", value: "Full-time" },
        { label: "Part time", value: "Part-time" },
        { label: "Contractual", value: "Contractual" },
        { label: "Internship", value: "Internship" },
        { label: "Project based", value: "Project-based" }
    ];

    const workModeData = [
        { label: "Remote", value: "Remote" },
        { label: "On-site", value: "Onsite" },
        { label: "Hybrid", value: "Hybrid" },
    ];

    useEffect(() => {
        const { shiftTimimg, workMode } = queryString.parseUrl(window.location.href).query;
        const validShiftTimings = Array.isArray(shiftTimimg)
            ? shiftTimimg.filter((timing): timing is string => timing !== null && timing !== undefined)
            : shiftTimimg ? [shiftTimimg] : [];

        const validWorkModes = Array.isArray(workMode)
            ? workMode.filter((mode): mode is string => mode !== null && mode !== undefined)
            : workMode ? [workMode] : [];

        setSelectedShiftTimings(validShiftTimings); 
        setSelectedWorkModes(validWorkModes);
    }, [pathname]);

    const handleShiftTimingChange = (shiftTimings: string[]) => {
        setSelectedShiftTimings(shiftTimings);
        updateUrl({ shiftTimimg: shiftTimings });
    };

    const handleWorkModeChange = (workModes: string[]) => {
        setSelectedWorkModes(workModes);
        updateUrl({ workMode: workModes }); 
    };

    const updateUrl = (newParams: Record<string, string | string[]>) => {
        const currentSearchParams = queryString.parseUrl(window.location.href).query;
        const updatedQueryParams = { ...currentSearchParams, ...newParams };

        const url = queryString.stringifyUrl({ url: pathname, query: updatedQueryParams }, { skipNull: true });
        router.push(url);
    };

    return (
        <div>
            <DateFilter />
            <Separator className='my-3 text-gradient-start' />
            <ShiftTimingFilter data={shiftTimingData} selected={selectedShiftTimings} onChange={handleShiftTimingChange} />
            <Separator className='my-3 text-gradient-start' />
            <ShiftTimingFilter data={workModeData} selected={selectedWorkModes} onChange={handleWorkModeChange} /> 
        </div>
    );
};

export default SideBarFilterItems;

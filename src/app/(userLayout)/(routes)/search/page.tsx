import { getJobs } from '@/actions/getJobs';
import { auth } from '@/auth';
import CategoriesList from '@/components/ui/categories-list';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import SearchContainer from '@/components/ui/search-container';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { db } from '@/lib/db';
import React from 'react';
import FilterJob from './_components/FilterJob';
import SIdeBarFilterItems from './_components/SIdeBarFilterItems';
import { Category } from '@prisma/client';

interface SearchParams {
  title?: string;
  workMode?: string;
  shiftTimimg?: string;
  yearsOfExperience?: string;
  categoryId?: string;
  createdAtFilter?: string;
}

interface Props {
  searchParams: SearchParams;
  
}

const SearchPage = async ({ searchParams }: Props) => {

  let categories: Category[] = []

  try {
    categories = await db.category.findMany({
      orderBy: {
        categoryTitle: "desc",
      },
    });
  } catch (error) {
    console.log(error)
  }

  const session = await auth();
  const userId = session?.user.id;

  const jobs = await getJobs({ ...searchParams });




  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[100vh] max-w-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={25} className='p-5'>
          {/* Dashboard routes */}
          <p className='py-5 px-3'>Filter</p>

          <SIdeBarFilterItems />


        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="p-6">
            <div className="flex justify-between items-center">
              <SearchContainer />
              <div className="flex gap-3 items-center">
                <p>29 job</p>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>

              </div>
            </div>
            {/* Categories */}
            <CategoriesList categories={categories} />

            {/* Display job  */}
            <FilterJob userId={userId ? userId : ""} jobs={jobs} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SearchPage;

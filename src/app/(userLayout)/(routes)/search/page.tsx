import { getJobs } from '@/actions/getJobs';
import { auth } from '@/auth';
import CategoriesList from '@/components/ui/categories-list';
// import DashBoardRoutes from '@/components/Dashboad/DashBoardRoutes';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import SearchContainer from '@/components/ui/search-container';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { db } from '@/lib/db';
import React from 'react';

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
  children: React.ReactNode;
}

const SearchPage = async ({ searchParams, children }: Props) => {
  const categories = await db.category.findMany({
    orderBy: {
      categoryTitle: "desc",
    },
  });

  const session = await auth();
  const userId = session?.user.id;

  // Ensure to await getJobs if it's an async function
  const jobs = await getJobs({ ...searchParams });

  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[100vh] max-w-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={25}>
          {/* Dashboard routes */}
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
            <CategoriesList categories={categories}/>
            <span className="font-semibold">{children}</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SearchPage;

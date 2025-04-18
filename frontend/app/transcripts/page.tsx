import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GradeManagement from "@/components/grade-management"
import GradeEntry from "@/components/grade-entry"

export default function GradingSystem() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý Điểm Học Tập</h1>

      <Tabs defaultValue="management" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="management">Quản lý Điểm</TabsTrigger>
          <TabsTrigger value="entry">Nhập Điểm</TabsTrigger>
        </TabsList>
        <TabsContent value="management">
          <GradeManagement />
        </TabsContent>
        <TabsContent value="entry">
          <GradeEntry />
        </TabsContent>
      </Tabs>
    </div>
  )
}

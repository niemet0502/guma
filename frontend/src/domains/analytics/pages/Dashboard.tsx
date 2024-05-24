import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Card, LineChart, ProgressBar } from "@tremor/react";
import { TeamProgressItem } from "../components/TeamProgressItem";
import { UpcomingDeadlineItem } from "../components/UpcomingDeadlineItem";
import { teamProgress, upcomingDeadline } from "../data/data";

const chartdata = [
  {
    name: "Gestion des stocks",
    "Total taches": 6,
    "Taches terminées": 6,
  },
  {
    name: "Gestion des ventes",
    "Total taches": 8,
    "Taches terminées": 4,
  },
  {
    name: "Gestion des employés",
    "Total taches": 4,
    "Taches terminées": 3,
  },
  {
    name: "Gestion clients",
    "Total taches": 4,
    "Taches terminées": 2,
  },
  {
    name: "Facturation",
    "Total taches": 4,
    "Taches terminées": 0,
  },
];

export const chartdata2 = [
  {
    date: "27 Avril",
    "Total taches": 7,
    "Taches en cours": 3,
    "Taches terminées": 2,
  },
  {
    date: "3 Mai",
    "Total taches": 7,
    "Taches en cours": 4,
    "Taches terminées": 3,
  },
  {
    date: "10 Mai",
    "Total taches": 7,
    "Taches en cours": 5,
    "Taches terminées": 3,
  },
  {
    date: "17 Mai",
    "Total taches": 8,
    "Taches en cours": 7,
    "Taches terminées": 4,
  },
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const dataFormatter2 = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export const Dashboard: React.FC = () => {
  return (
    <div
      className="p-5 min-h-full bg-secondary flex flex-col gap-5"
      //   style={{ backgroundColor: "rgb(247, 247, 247)" }}
    >
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      <Card className="w-full">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between mb-2">
          <span>12 Janvier 2024 &bull; 72%</span>
          <span>20 Mai 2024</span>
        </p>

        <ProgressBar value={72} />
      </Card>
      <div className="w-full border rounded-md bg-white flex">
        <div className="flex-1 py-6 pl-14 hover:bg-secondary">
          <h2 className="text-3xl font-bold">1</h2>
          <p>Livrable en attente</p>
        </div>
        <div className="flex-1 py-6 pl-14 hover:bg-secondary">
          <h2 className="text-3xl font-bold">2</h2>
          <p>Livrable en cours</p>
        </div>
        <div className="flex-1 py-6 pl-14 hover:bg-secondary">
          <h2 className="text-3xl font-bold">1</h2>
          <p>Livrable terminé</p>
        </div>
        <div className="flex-1 py-6 pl-14 hover:bg-secondary">
          <h2 className="text-3xl font-bold">1</h2>
          <p className="color-secondary">Livrable en retard</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 bg-transparent">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Livrable progression</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Writing Contest: Entries
            </h3> */}
            <BarChart
              className="mt-6"
              data={chartdata}
              index="name"
              categories={["Total taches", "Taches terminées"]}
              colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
            />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Prochaines deadlines</CardTitle>
            {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="w-full px-5 py-3 flex justify-between border-b hover:bg-slate-50 hover:cursor-pointer">
              <div className="flex-1">Module</div>
              <div className="flex-1 pl-3">Date</div>
              <div className="flex-1">Progression</div>
            </div>
            {upcomingDeadline.map((module: any) => (
              <UpcomingDeadlineItem key={module.id} module={module} />
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 bg-transparent">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <h2>Equipes</h2>
              </div>
            </CardTitle>
            {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="w-full pr-5 py-3 flex justify-between border-b hover:bg-slate-50 hover:cursor-pointer">
              <div className="flex-1">Equipe</div>
              <div className="flex-1">Chef Equipe</div>
              <div className="flex-1 pl-4">Membres</div>
              <div className="flex-1">Taches</div>
            </div>
            {teamProgress.map((team) => (
              <TeamProgressItem key={team.id} team={team} />
            ))}
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <h2>Gestion des ventes progression</h2>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Gestion des clients</SelectItem>
                    <SelectItem value="dark">Gestion des stocks</SelectItem>
                    <SelectItem value="system">Gestion des ventes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <LineChart
              className="h-80"
              data={chartdata2}
              index="date"
              categories={[
                "Total taches",
                "Taches en cours",
                "Taches terminées",
              ]}
              colors={["indigo", "rose", "green"]}
              valueFormatter={dataFormatter2}
              yAxisWidth={60}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

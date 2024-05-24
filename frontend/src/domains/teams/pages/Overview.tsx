import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  chartdata2,
  dataFormatter2,
} from "@/domains/analytics/pages/Dashboard";
import {
  BarChart,
  Card,
  DonutChart,
  LineChart,
  ProgressBar,
} from "@tremor/react";
import { membersData } from "../data/data";

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;
const datahero = [
  {
    name: "En attente",
    value: 10,
  },
  {
    name: "En cours",
    value: 8,
  },
  {
    name: "En review",
    value: 6,
  },
  {
    name: "Terminé",
    value: 12,
  },
  {
    name: "En retard",
    value: 5,
  },
];

const colors = ["blue", "cyan", "indigo", "violet", "fuchsia"];

export const TeamOverview: React.FC = () => {
  return (
    <div className="p-5 min-h-full bg-secondary flex flex-col gap-5">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      <Card className="w-full border rounded-md bg-white flex">
        <div className="flex-1 py-6 pl-14 hover:bg-secondary">
          <h2 className="text-3xl font-bold">10</h2>
          <p className="mt-1">Taches en attente</p>
        </div>
        <div className="flex-1 py-6 pl-14 hover:bg-secondary">
          <h2 className="text-3xl font-bold">8</h2>
          <p className="mt-1">Taches en cours</p>
        </div>
        <div className="flex-1 py-6 pl-14 hover:bg-secondary">
          <h2 className="text-3xl font-bold">12</h2>
          <p className="mt-1">Taches terminé</p>
        </div>
        <div className="flex-1 py-6 pl-14 hover:bg-secondary">
          <h2 className="text-3xl font-bold">5</h2>
          <p className="mt-1">Taches en retard</p>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 bg-transparent">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Team progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="flex-1 ">
                  <DonutChart
                    data={datahero}
                    variant="pie"
                    valueFormatter={dataFormatter}
                    className="w-full"
                    colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                  />
                </div>
                <div className="flex-1 ">
                  {colors.map((color, i) => (
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 y-4 bg-${color}-500 text-${color}-500`}
                        >
                          .
                        </div>
                        <span>{datahero[i].name}</span>
                      </div>
                      <span>{datahero[i].value}</span>
                    </div>
                  ))}

                  <div className="flex items-center justify-between mt-4 font-bold">
                    <span>Total</span>
                    <span>
                      {datahero.reduce((sum, data) => (sum += data.value), 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Charge de travail</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              className="mt-6"
              data={membersData}
              index="name"
              categories={["completedTask", "totalTask"]}
              colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 bg-transparent">
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex justify-between">
              <span>Respect des échéances</span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="w-full pr-5 py-3 flex justify-between border-b hover:bg-slate-50 hover:cursor-pointer">
              <div className="flex-1">Membre</div>
              <div className="flex-1 pr-4">Pourcentage</div>
              <div className="flex-1 pl-12">Total</div>
            </div>
            {membersData.map((member) => (
              <div className="flex w-full  py-2 border-b">
                <div className="flex-1">{member.name}</div>
                <div className="flex-1 flex justify-between pr-4">
                  <div className="w-3/5 ">
                    <ProgressBar
                      value={Math.floor(
                        (member.completedOnTime / member.completedTask) * 100
                      )}
                      color="teal"
                      className="mt-3"
                    />
                  </div>
                  {Math.floor(
                    (member.completedOnTime / member.completedTask) * 100
                  )}{" "}
                  %
                </div>
                <div className="flex-1">
                  <div className=" text-blue-400 font-bold w-6 rounded-full h-6 flex items-center justify-center">
                    {member.completedTask}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex justify-between">
              <span>Suivi des progrès - Chadwick Boseman</span>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chadwick Boseman" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Gestion des clients</SelectItem>
                  <SelectItem value="dark">Gestion des stocks</SelectItem>
                  <SelectItem value="system">Chadwick Boseman</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
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

import { Bell, LogIn } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { getNotifications } from "@/services/notifications"
import { useEffect, useState } from "react"

type INotification = {
  id: string;
  title: string;
  description: string;
}

export const DropdownNotifications = () => {
  const [notifications, setNotifications] = useState<INotification[]>([])

  useEffect(() => {

    const fetchData = async () => {
      const data = await getNotifications();
      setNotifications(data);
    }

    fetchData();
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" style={{ cursor: 'pointer' }}>
        <Bell size="25" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-xs">

        {notifications.map(item => (
          <DropdownMenuItem key={item.id}>
            <div className="flex p-1 space-x-2 items-center">
              <LogIn />
              <div className="text-start pl-2">
                <p className="text-sm font-semibold">{item.title}</p>
                <p dangerouslySetInnerHTML={{ __html: item.description }} className="text-xs text-muted-foreground break-normal" />
              </div>
            </div>
          </DropdownMenuItem>
        ))}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
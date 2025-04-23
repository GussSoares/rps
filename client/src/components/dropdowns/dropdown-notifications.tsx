import { Bell, BellDot, CheckCheck, LogIn } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { getNotifications, readNotificationRequest } from "@/services/notifications"
import { useState } from "react"
import { Button } from "../ui/button"

type INotification = {
  id: string;
  title: string;
  description: string;
}

export const DropdownNotifications = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const fetchData = async () => {
    const data = await getNotifications();
    setNotifications(data);
  }

  const readNotification = async (id: string) => {
    await readNotificationRequest(id);
    await fetchData();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onPointerDown={() => fetchData()} className="focus:outline-none" style={{ cursor: 'pointer' }}>
        {
          notifications.length
            ? <BellDot size="25" />
            : <Bell size="25" />
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-xs">
        {
          notifications.length ? (
            notifications.map(item => (
              <DropdownMenuItem key={item.id} onClick={e => e.preventDefault()}>
                <div className="flex p-1 space-x-2 items-center">
                  <LogIn />
                  <div className="text-start pl-2">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p dangerouslySetInnerHTML={{ __html: item.description }} className="text-xs text-muted-foreground break-normal" />
                  </div>
                  <Button variant="secondary" onClick={() => readNotification(item.id)} title="Mark as read">
                    <CheckCheck color="green" />
                  </Button>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="text-center justify-center py-2">
              <span className="text-sm text-gray-500 ">No notifications</span>
            </div>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
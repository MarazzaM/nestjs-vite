import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useStore } from "@/store/store";
import { Button } from "@/components/ui/button"

export function SeparatorNav() {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const handleLogOut = () => {
    removeCookie('accessToken');
    localStorage.clear();
    useStore.getState().startLogout();
    window.location.href = "/login";

  }

  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Chatroom</h4>
        <p className="text-sm text-muted-foreground">
          Make friends here!
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm justify-center">
      <Button variant="link"><Link to="/login">Login page</Link></Button>
        <Separator orientation="vertical" />
        <Button variant="link" ><a href="https://github.com/MarazzaM" target="blank">Github</a></Button>
        <Separator orientation="vertical" />
        <Button variant="link" onClick={handleLogOut}>Link</Button>
      </div>
    </div>
  )
}

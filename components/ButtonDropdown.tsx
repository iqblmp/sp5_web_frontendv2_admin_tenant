import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "./ui/button"

export default function ButtonDropdown({
  text,
  icon,
  color,
  size,
  htmlFor,
  onClick,
  actionList,
  position,
  divider, // array
}) {
  //   let pos = ""
  //   if (position === "top-left") pos = "dropdown-menu-top-left"
  //   if (position === "left-bottom") pos = "dropdown-menu-left-bottom"

  //   const dropdownRef = useRef()
  //   const itemRef = []
  //   for (let i = 0; i < actionList.length; i++) {
  //     itemRef.push(useRef())
  //   }

  //   const [dropdownOpen, setDropdownOpen] = useState(false)

  //   useEffect(() => {
  //     if (dropdownOpen) {
  //       dropdownRef.current.focus()
  //     } else {
  //       dropdownRef.current.blur()
  //     }
  //   }, [dropdownOpen])

  //   useEffect(() => {
  //     // add focus handler function
  //     const handleFocusOut = (event) => {
  //       if (dropdownRef.current === event.target) {
  //         setDropdownOpen(false)
  //       }
  //     }

  //     document.addEventListener("focusout", handleFocusOut)

  //     return () => {
  //       document.removeEventListener("focusout", handleFocusOut)
  //     }
  //   }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {(htmlFor || onClick) && (
          <Button variant="ghost" className="h-8 w-10 p-0 ">
            <span className="sr-only">Action</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          // <Button
          //   size="xs"
          //   variant={"destructive"}
          //   className={" " + color + size}
          // >
          //   <label
          //     className="flex gap-x-2 items-center justify-center cursor-pointer"
          //     htmlFor={htmlFor}
          //   >
          //     {/* <i className={icon}></i> */}
          //     <span>{text}</span>
          //   </label>
          // </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {htmlFor == "test" && (
          <>
            <DropdownMenuLabel className="cursor-pointer" onClick={onClick}>
              {" "}
              Action
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
          </>
        )}

        {actionList.map((item, index) => (
          <DropdownMenuItem
            //   ref={itemRef[index]}
            key={`${item.text}-${index}`}
            className={
              " flex flex-row gap-x-2 items-center justify-start cursor-pointer" +
              (size ? `text-${size}` : "")
            }
            // htmlFor={item.htmlFor}
            onClick={() => {
              item.onClick()
              //   setDropdownOpen(false)
              //   itemRef[index].current.blur()
            }}
            tabIndex={-1}
          >
            <i className={item.icon}></i>
            <span className="text-wrap">{item.text}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

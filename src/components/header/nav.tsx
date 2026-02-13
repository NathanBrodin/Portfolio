import { Link } from '@tanstack/react-router'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export function Nav() {
  return (
    <NavigationMenu className="xs:flex hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/" />}
            className={navigationMenuTriggerStyle()}
          >
            Portfolio
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

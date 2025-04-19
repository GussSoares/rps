import React, { useEffect, useState } from "react";
import { Breadcrumb as ShadCNBreadCrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

type Crumb = { path: string; label: string };

type RouteMap = {
  user: Crumb;
  users: Crumb;
  home: Crumb;
  dashboard: Crumb;
};

const BREADCRUMB: RouteMap = {
  user: {
    path: '/user',
    label: 'Usuário'
  },
  users: {
    path: '/users',
    label: 'Usuários'
  },
  home: {
    path: '/',
    label: 'Início'
  },
  dashboard: {
    path: '/dashboard',
    label: 'Dashboard'
  }
}


export const Breadcrumb = (props: React.HtmlHTMLAttributes<HTMLElement>) => {
  const [bcrumb, setBcrumb] = useState<Crumb[] | []>([])
  let breadcrumb: Crumb[] = [];
  const location = useLocation();

  useEffect(() => {
    breadcrumb = location.pathname.split('/').map((value) => {
      if (value === '') {
        value = 'home'
      }
      return BREADCRUMB[value as keyof typeof BREADCRUMB]
    }).filter(Boolean);

    setBcrumb(Array.from(new Set(breadcrumb)))
  }, [location])

  return (
    <ShadCNBreadCrumb {...props}>
      <BreadcrumbList>
        <BreadcrumbItem>RPS</BreadcrumbItem>
        {
          bcrumb.map((value: Crumb, index) => {
            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {
                    (index === bcrumb.length - 1)
                      ? (
                        <b>{value.label}</b>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={value.path}>{value.label}</Link>
                        </BreadcrumbLink>
                      )
                  }
                </BreadcrumbItem>
              </React.Fragment>
            )
          })
        }
      </BreadcrumbList>
    </ShadCNBreadCrumb>
  )
}
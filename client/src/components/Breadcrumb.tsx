import React, { useEffect, useState } from "react";
import { Breadcrumb as ShadCNBreadCrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Link } from "react-router-dom";

type Crumb = { path: string; label: string };

type RouteMap = {
  user: Crumb;
  home: Crumb;
  dashboard: Crumb;
};

const BREADCRUMB: RouteMap = {
  user: {
    path: '/user',
    label: 'Usuário'
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


export const Breadcrumb = () => {
  const [bcrumb, setBcrumb] = useState<Crumb[] | []>([])
  let breadcrumb: Crumb[] = [];
  let currentUrl = location.href;

  useEffect(() => {
    breadcrumb = currentUrl.split('/').map((value) => {
      if (value === '') {
        value = 'home'
      }
      return BREADCRUMB[value as keyof typeof BREADCRUMB]
    }).filter(Boolean);

    setBcrumb(Array.from(new Set(breadcrumb)))
  }, [currentUrl])

  return (
    <ShadCNBreadCrumb>
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
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/crm" },
  { label: "Leads", href: "/crm/leads" },
  { label: "Accounts", href: "/crm/accounts" },
  { label: "Opportunities", href: "/crm/opportunities" },
  { label: "Proposals", href: "/crm/proposals" },
  { label: "Customers", href: "/crm/customers" },
  { label: "Tasks", href: "/crm/tasks" },
  { label: "Tickets", href: "/crm/tickets" },
  { label: "Reporting", href: "/crm/reporting" },
];

export default function CrmSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-slate-200 bg-white/90 backdrop-blur-sm transition-[width] duration-200 ease-out",
        collapsed ? "w-[64px]" : "w-44"
      )}
    >
      {/* Brand */}
      <div className="flex h-14 items-center justify-center border-b border-slate-200 px-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
            F
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Fahrly
              </span>
              <span className="text-sm font-semibold text-slate-900">CRM</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 text-sm">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname?.startsWith(item.href) && item.href !== "/crm");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-2 py-2 text-xs font-medium transition-colors duration-150",
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  collapsed && "justify-center"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center shrink-0",
                    isActive ? "text-white" : "text-slate-500"
                  )}
                >
                {item.label === "Overview" && (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                )}
                {item.label === "Leads" && (
                  <svg
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path>
                    </g>
                  </svg>
                )}
                {item.label === "Accounts" && (
                  <svg
                    viewBox="0 0 16 16"
                    id="company-small-16px"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <rect
                        id="Retângulo_223"
                        data-name="Retângulo 223"
                        width="16"
                        height="16"
                        fill="#ccc"
                        opacity="0"
                      ></rect>
                      <g id="Icone" transform="translate(0.648 -0.621)">
                        <g
                          id="Retângulo_203"
                          data-name="Retângulo 203"
                          transform="translate(2.352 2.621)"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            d="M1,0H9a1,1,0,0,1,1,1V12a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V1A1,1,0,0,1,1,0Z"
                            stroke="none"
                          ></path>
                          <rect
                            x="0.5"
                            y="0.5"
                            width="9"
                            height="11"
                            rx="0.5"
                            fill="none"
                          ></rect>
                        </g>
                        <g
                          id="Retângulo_227"
                          data-name="Retângulo 227"
                          transform="translate(5.352 9.621)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                        >
                          <rect width="4" height="5" stroke="none"></rect>
                          <rect
                            x="0.5"
                            y="0.5"
                            width="3"
                            height="4"
                            fill="none"
                          ></rect>
                        </g>
                        <g id="Grupo_334" data-name="Grupo 334">
                          <g
                            id="Retângulo_206"
                            data-name="Retângulo 206"
                            transform="translate(5.352 5.621)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                          >
                            <rect width="1" height="1" stroke="none"></rect>
                            <rect x="0.5" y="0.5" fill="none"></rect>
                          </g>
                          <g
                            id="Retângulo_225"
                            data-name="Retângulo 225"
                            transform="translate(5.352 7.621)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                          >
                            <rect width="1" height="1" stroke="none"></rect>
                            <rect x="0.5" y="0.5" fill="none"></rect>
                          </g>
                          <g
                            id="Retângulo_224"
                            data-name="Retângulo 224"
                            transform="translate(8.352 5.621)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                          >
                            <rect width="1" height="1" stroke="none"></rect>
                            <rect x="0.5" y="0.5" fill="none"></rect>
                          </g>
                          <g
                            id="Retângulo_226"
                            data-name="Retângulo 226"
                            transform="translate(8.352 7.621)"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                          >
                            <rect width="1" height="1" stroke="none"></rect>
                            <rect x="0.5" y="0.5" fill="none"></rect>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                )}
                {item.label === "Opportunities" && (
                  <svg
                    version="1.1"
                    id="_x32_"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <path
                          d="M77.609,448h52.781c7.516,0,13.609-6.094,13.609-13.609V315.094c0-7.516-6.094-13.609-13.609-13.609H77.609 c-7.516,0-13.609,6.094-13.609,13.609v119.297C64,441.906,70.094,448,77.609,448z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M197.609,448h52.781c7.516,0,13.609-6.094,13.609-13.609V235.094c0-7.516-6.094-13.609-13.609-13.609h-52.781 c-7.516,0-13.609,6.094-13.609,13.609v199.297C184,441.906,190.094,448,197.609,448z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M317.609,448h52.781c7.516,0,13.609-6.094,13.609-13.609V139.094c0-7.516-6.094-13.609-13.609-13.609h-52.781 c-7.516,0-13.609,6.094-13.609,13.609v295.297C304,441.906,310.094,448,317.609,448z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M437.609,448h52.781c7.516,0,13.609-6.094,13.609-13.609V43.094c0-7.516-6.094-13.609-13.609-13.609h-52.781 c-7.516,0-13.609,6.094-13.609,13.609v391.297C424,441.906,430.094,448,437.609,448z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M498.391,482H45.609C38.094,482,32,475.906,32,468.391V13.609C32,6.094,25.906,0,18.391,0h-4.781 C6.094,0,0,6.094,0,13.609v484.781C0,505.906,6.094,512,13.609,512h484.781c7.516,0,13.609-6.094,13.609-13.609v-2.781 C512,488.094,505.906,482,498.391,482z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </g>
                  </svg>
                )}
                {item.label === "Proposals" && (
                  <svg
                    viewBox="0 0 1024 1024"
                    className="h-4 w-4"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M182.52 146.2h585.14v256h73.15V73.06H109.38v877.71h256v-73.14H182.52z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M255.67 219.34h438.86v73.14H255.67zM255.67 365.63h365.71v73.14H255.67zM255.67 511.91H475.1v73.14H255.67zM775.22 458.24L439.04 794.42l-0.52 154.64 155.68 0.52L930.38 613.4 775.22 458.24z m51.72 155.16l-25.43 25.43-51.73-51.72 25.44-25.44 51.72 51.73z m-77.14 77.15L620.58 819.77l-51.72-51.72 129.22-129.22 51.72 51.72zM511.91 876.16l0.17-51.34 5.06-5.06 51.72 51.72-4.85 4.85-52.1-0.17z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                )}
                {item.label === "Customers" && (
                  <svg
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path>
                    </g>
                  </svg>
                )}
                {item.label === "Tasks" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M12.37 8.87988H17.62"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6.38 8.87988L7.13 9.62988L9.38 7.37988"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12.37 15.8799H17.62"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6.38 15.8799L7.13 16.6299L9.38 14.3799"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                )}
                {item.label === "Tickets" && (
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M2,21h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm13,8.5v5a.5.5,0,0,1-.5.5h-1v2L19,19H14.5a.5.5,0,0,1-.5-.5v-5a.5.5,0,0,1,.5-.5h8A.5.5,0,0,1,23,13.5Z"></path>
                    </g>
                  </svg>
                )}
                {item.label === "Reporting" && (
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512.003 512.003"
                    xmlSpace="preserve"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <g>
                            <path d="M136.586,170.408l-0.051-0.051V86.448c-38.622,6.17-68.267,39.62-68.267,79.949c0,44.706,36.369,81.067,81.067,81.067 c17.101,0,32.956-5.35,46.046-14.421l-56.346-56.346C137.303,174.964,136.518,172.678,136.586,170.408z"></path>
                            <path d="M229.803,156.942c-0.23-1.937-0.521-3.857-0.879-5.751c-0.111-0.572-0.205-1.135-0.324-1.707 c-0.495-2.321-1.084-4.617-1.775-6.869c-0.034-0.137-0.068-0.273-0.111-0.401c-7.919-25.284-27.913-45.278-53.197-53.188 c-0.119-0.043-0.247-0.077-0.367-0.111c-2.261-0.691-4.565-1.28-6.895-1.775c-0.572-0.119-1.152-0.222-1.724-0.324 c-1.877-0.358-3.78-0.648-5.7-0.879c-0.913-0.102-1.835-0.188-2.756-0.265c-0.819-0.068-1.647-0.077-2.475-0.12v76.578h76.587 c-0.043-0.845-0.06-1.698-0.128-2.534C229.982,158.709,229.905,157.821,229.803,156.942z"></path>
                            <path d="M208.316,221.845c10.871-11.563,18.364-26.283,20.975-42.641h-63.625L208.316,221.845z"></path>
                            <path d="M0,354.135c0,21.171,17.229,38.4,38.4,38.4h164.011l-12.8,51.2h-1.877c-23.526,0-42.667,19.14-42.667,42.667 c0,4.71,3.823,8.533,8.533,8.533h204.8c4.719,0,8.533-3.823,8.533-8.533c0-23.526-19.14-42.667-42.667-42.667h-1.869l-12.8-51.2 H473.6c21.18,0,38.4-17.229,38.4-38.4v-29.867H0V354.135z M219.998,392.535h72.004l12.8,51.2h-97.604L219.998,392.535z"></path>
                            <path d="M473.603,17.068h-435.2c-21.171,0-38.4,17.229-38.4,38.4v251.733h512V55.468 C512.003,34.297,494.774,17.068,473.603,17.068z M360.877,62.209c0.853-0.768,1.707-1.365,2.816-1.792 c3.157-1.365,6.912-0.597,9.301,1.792c1.536,1.621,2.475,3.84,2.475,6.059s-0.939,4.437-2.475,6.059 c-1.621,1.536-3.84,2.475-6.059,2.475s-4.446-0.939-6.059-2.475c-1.545-1.621-2.475-3.84-2.475-6.059 S359.333,63.831,360.877,62.209z M315.736,59.735h17.067c4.719,0,8.533,3.823,8.533,8.533s-3.814,8.533-8.533,8.533h-17.067 c-4.719,0-8.533-3.823-8.533-8.533S311.017,59.735,315.736,59.735z M247.367,170.933l-0.154,3.524l-0.162,0.145 c-2.142,25.719-14.251,48.597-32.435,64.862c-0.119,0.137-0.162,0.316-0.299,0.452c-0.213,0.213-0.495,0.29-0.725,0.478 c-17.237,14.993-39.671,24.141-64.256,24.141c-54.11,0-98.133-44.023-98.133-98.133c0-51.336,39.646-93.517,89.907-97.715 l0.034-0.034l3.661-0.282c0.742-0.034,1.468,0.034,2.21,0.017c0.777-0.017,1.536-0.119,2.321-0.119 c1.075,0,2.116,0.128,3.183,0.162c1.468,0.051,2.935,0.102,4.403,0.222c2.065,0.162,4.104,0.401,6.135,0.691 c1.203,0.171,2.406,0.333,3.601,0.546c2.21,0.401,4.378,0.896,6.537,1.434c1.041,0.265,2.082,0.512,3.115,0.802 c2.167,0.623,4.292,1.348,6.391,2.108c1.041,0.375,2.082,0.734,3.106,1.143c1.937,0.776,3.814,1.647,5.692,2.543 c1.169,0.563,2.355,1.092,3.499,1.69c1.562,0.828,3.055,1.741,4.557,2.637c1.382,0.828,2.782,1.621,4.13,2.509 c1.058,0.717,2.065,1.502,3.098,2.253c1.664,1.203,3.345,2.381,4.932,3.695c0.034,0.026,0.068,0.06,0.102,0.085 c2.381,1.971,4.702,4.019,6.904,6.221c2.091,2.082,4.019,4.301,5.897,6.554c0.136,0.162,0.299,0.316,0.435,0.478 c1.229,1.502,2.33,3.081,3.473,4.642c0.836,1.143,1.707,2.253,2.492,3.439c0.811,1.22,1.536,2.5,2.287,3.763 c0.99,1.638,1.988,3.277,2.884,4.975c0.529,1.015,0.99,2.057,1.485,3.089c0.973,2.014,1.911,4.036,2.739,6.118 c0.367,0.913,0.683,1.835,1.015,2.756c0.811,2.21,1.562,4.446,2.219,6.724c0.273,0.964,0.495,1.937,0.742,2.901 c0.555,2.202,1.058,4.42,1.459,6.682c0.222,1.195,0.384,2.389,0.555,3.593c0.282,2.005,0.521,4.019,0.683,6.067 c0.119,1.502,0.179,3.004,0.23,4.523c0.026,1.033,0.154,2.048,0.154,3.089c0,0.777-0.102,1.528-0.119,2.304 C247.333,169.448,247.401,170.19,247.367,170.933z M298.669,281.601c0,4.71-3.814,8.533-8.533,8.533s-8.533-3.823-8.533-8.533 v-25.6c0-4.71,3.814-8.533,8.533-8.533s8.533,3.823,8.533,8.533V281.601z M307.203,110.935c0-4.71,3.814-8.533,8.533-8.533 h68.267c4.719,0,8.533,3.823,8.533,8.533c0,4.71-3.814,8.533-8.533,8.533h-68.267 C311.017,119.468,307.203,115.645,307.203,110.935z M332.803,281.601c0,4.71-3.814,8.533-8.533,8.533 c-4.719,0-8.533-3.823-8.533-8.533v-59.733c0-4.71,3.814-8.533,8.533-8.533c4.719,0,8.533,3.823,8.533,8.533V281.601z M366.936,281.601c0,4.71-3.814,8.533-8.533,8.533s-8.533-3.823-8.533-8.533v-42.667c0-4.71,3.814-8.533,8.533-8.533 s8.533,3.823,8.533,8.533V281.601z M401.069,281.601c0,4.71-3.814,8.533-8.533,8.533c-4.719,0-8.533-3.823-8.533-8.533v-102.4 c0-4.71,3.814-8.533,8.533-8.533c4.719,0,8.533,3.823,8.533,8.533V281.601z M435.203,281.601c0,4.71-3.814,8.533-8.533,8.533 s-8.533-3.823-8.533-8.533v-68.267c0-4.71,3.814-8.533,8.533-8.533s8.533,3.823,8.533,8.533V281.601z M432.728,116.993 c-1.621,1.536-3.84,2.475-6.059,2.475s-4.446-0.939-6.059-2.475c-0.341-0.427-0.768-0.853-1.024-1.28 c-0.341-0.512-0.597-1.024-0.768-1.536c-0.256-0.512-0.427-1.024-0.512-1.536c-0.085-0.597-0.171-1.195-0.171-1.707 c0-0.512,0.085-1.109,0.171-1.707c0.085-0.512,0.256-1.024,0.512-1.536c0.171-0.512,0.427-1.024,0.768-1.536 c0.256-0.427,0.683-0.853,1.024-1.28c3.157-3.157,8.875-3.157,12.117,0c1.536,1.621,2.475,3.755,2.475,6.059 C435.203,113.239,434.264,115.372,432.728,116.993z M426.669,76.801h-25.6c-4.719,0-8.533-3.823-8.533-8.533 s3.814-8.533,8.533-8.533h25.6c4.719,0,8.533,3.823,8.533,8.533S431.388,76.801,426.669,76.801z"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                )}
                </span>
                {!collapsed && (
                  <span
                    className={cn(
                      "truncate text-[13px]",
                      isActive ? "text-white" : "text-slate-700"
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-slate-200 px-2 py-2">
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 text-[11px] font-medium text-slate-600 transition-colors duration-150",
            "hover:bg-slate-50 hover:text-slate-900"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="flex h-4 w-4 items-center justify-center shrink-0">
            <svg
              viewBox="0 0 20 20"
              className="h-3 w-3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d={collapsed ? "M12 5L8 10l4 5" : "M8 5l4 5-4 5"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {!collapsed && <span>Collapse sidebar</span>}
        </button>
      </div>
    </aside>
  );
}


import { PhoneIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { ApiData } from '../Helpers/Fetcher';
import { Messenger } from '../Helpers/Messenger';
import { Dropdown } from './components/dropdown/Dropdown';
import Editor from "@monaco-editor/react";

export interface IDashboardProps {}

export type RequestType = "GET" | "POST";

Messenger.getVsCodeAPI();

export const Dashboard: React.FunctionComponent<IDashboardProps> = (props: React.PropsWithChildren<IDashboardProps>) => {
  const [ method, setMethod ] = React.useState<RequestType>("GET");
  const [ url, setUrl ] = React.useState<string>("");
  const [ body, setBody ] = React.useState<string>("");

  const call = () => {
    Messenger.sendMessage(Messenger.Commands.Call, {
      method: method,
      url: url,
      body: body
    } as ApiData)
  }

  React.useEffect(() => {
    if (method === "GET") {
      setBody("");
    }
  }, [method]);

  return (
    <div className={`mx-auto max-w-7xl w-full h-full p-4`}>
      <div className={`grid grid-cols-12 gap-16`}>
        <div className={`col-span-2`}>
          <Dropdown
            options={["GET", "POST"]}
            setOption={(crntMethod) => setMethod(crntMethod)}
            title={method} />
        </div>
        <div className={`col-span-8`}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-gray-700 placeholder-gray-500 px-4 py-2 h-full block w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter your API URL" />
        </div>
        <div className={`col-span-2`}>
          <button
            disabled={!url}
            type="button"
            className="inline-flex justify-between w-full items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple hover:bg-opacity-80 disabled:bg-gray-500 focus:outline-none"
            onClick={call}
          >
            Call
            <PhoneIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        
        <div className={`col-span-12 ${method === "POST" ? "" : "hidden"}`}>
          <Editor
              height="20vh"
              defaultLanguage="json"
              value={body}
              onChange={(newValue) => setBody(newValue || "")}
            />
        </div>
      </div>

      <div className={`mt-16 space-y-4`}>
        <h2 className={`text-xl`}>Sample APIs</h2>
        <p className={`text-base`}><b>GET</b>: https://reqres.in/api/users</p>
        <p className={`text-base`}><b>POST</b>: https://reqres.in/api/create</p>
        <pre>{`{
    "name": "morpheus",
    "job": "leader"
}`}</pre>
      </div>
    </div>
  );
};
"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Snippet,
} from "@nextui-org/react";

interface Memo {
  from: string;
  timestamp: bigint;
  name: string;
  message: string;
}

interface MemoComponentProps {
  memos: Memo[];
}

export function MemoComponent(props: MemoComponentProps) {
  const { memos } = props;
  const sortedMemos = [...memos].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );
  const lastThreeMemos = sortedMemos.slice(0, 3);

  return (
    <>
      <h2 className="my-4 font-bold text-xl">Last three memos</h2>
      {lastThreeMemos && lastThreeMemos.length === 0 ? (
        <p>No memos available.</p>
      ) : (
        lastThreeMemos?.map((memo, index) => (
          <Card
            key={index}
            className="mb-4 text-small font-medium leading-none text-default-600"
          >
            <CardHeader>
              <p>Name: {memo.name}</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Message: {memo.message}</p>
            </CardBody>
            <Divider />
            <CardBody>
              <p className="text-left">
                Date: {new Date(Number(memo.timestamp) * 1000).toLocaleString()}
              </p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Snippet symbol="" color="default">
                {memo.from}
              </Snippet>
            </CardFooter>
          </Card>
        ))
      )}
    </>
  );
}

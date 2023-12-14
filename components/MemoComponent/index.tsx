"use client";

import React, { useEffect, useState } from "react";

interface Memo {
  from: string;
  timestamp: number;
  name: string;
  message: string;
}

interface MemoComponentProps {
  memos: Memo[];
}

export function MemoComponent(props: MemoComponentProps) {
  const { memos } = props;

  return (
    <div>
      <h1>Memos</h1>
      {memos && memos.length === 0 ? (
        <p>No memos available.</p>
      ) : (
        memos?.map((memo, index) => (
          <div key={index}>
            <p>From: {memo.from}</p>
            <p>
              Timestamp:
              {new Date(Number(memo.timestamp) * 1000).toLocaleString()}
            </p>
            <p>Name: {memo.name}</p>
            <p>Message: {memo.message}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

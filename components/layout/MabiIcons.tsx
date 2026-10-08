"use client";

export type MabiIconKind =
  | "home"
  | "terms"
  | "study"
  | "fav"
  | "settings"
  | "assets";

/**
 * 마비노기 UI 오마주 아이콘.
 * - 직접 그린 오리지널 SVG (저작 자산 복제 아님).
 * - 질감 포인트: 양피지 그라디언트 + 진갈색 외곽선 + 금색 이너라인
 *   (마비노기 스킬 슬롯의 둥근 사각 슬롯 느낌).
 */
export function MabiIcon({
  kind,
  size = 22,
}: {
  kind: MabiIconKind;
  size?: number;
}) {
  const box = size + 6;
  return (
    <span
      aria-hidden="true"
      className="mabi-icon"
      style={{ width: box, height: box }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 18 18"
        fill="none"
        role="presentation"
      >
        {kind === "home" && (
          <g stroke="#5A3D2B" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M2.5 9.5 9 3.2l6.5 6.3" fill="#F5E6C8" />
            <path
              d="M4.5 8.8V14.5h9V8.8"
              fill="#C9A86A"
              stroke="#5A3D2B"
            />
            <rect x="7.2" y="10.6" width="3.6" height="3.9" fill="#5A3D2B" stroke="none" rx="0.4" />
            <rect x="7.7" y="11.1" width="1" height="1" fill="#FFD873" stroke="none" />
          </g>
        )}
        {kind === "terms" && (
          <g stroke="#5A3D2B" strokeWidth="1.4" strokeLinecap="round">
            <rect x="3.5" y="2.5" width="11" height="13" rx="1.2" fill="#FFF8E7" />
            <rect x="3.5" y="2.5" width="11" height="2.6" rx="1.2" fill="#C9A86A" />
            <line x1="6" y1="8" x2="12" y2="8" />
            <line x1="6" y1="10.4" x2="12" y2="10.4" />
            <line x1="6" y1="12.8" x2="10.4" y2="12.8" />
          </g>
        )}
        {kind === "study" && (
          <g stroke="#5A3D2B" strokeWidth="1.4" strokeLinejoin="round">
            <path
              d="M9 4.5C7.2 3.3 5 3.2 2.8 4v9.2c2.2-.8 4.4-.7 6.2.5 1.8-1.2 4-1.3 6.2-.5V4c-2.2-.8-4.4-.7-6.2.5Z"
              fill="#FFF8E7"
            />
            <line x1="9" y1="4.5" x2="9" y2="13.7" />
            <path
              d="M13.6 2.2l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5z"
              fill="#FFD873"
              strokeWidth="1"
            />
          </g>
        )}
        {kind === "fav" && (
          <g stroke="#5A3D2B" strokeWidth="1.4" strokeLinejoin="round">
            <path
              d="M9 2.2l2 4.3 4.7.5-3.5 3.1.9 4.6L9 12.4l-4.1 2.3.9-4.6L2.3 6.9l4.7-.5z"
              fill="#FFD873"
            />
            <circle cx="9" cy="8.6" r="1.4" fill="#FFF8E7" strokeWidth="1" />
          </g>
        )}
        {kind === "settings" && (
          <g stroke="#5A3D2B" strokeWidth="1.5">
            <circle cx="9" cy="9" r="2.6" fill="#C9A86A" />
            <circle cx="9" cy="9" r="1" fill="#FFF8E7" />
            <g strokeLinecap="round">
              <line x1="9" y1="2.6" x2="9" y2="4.6" />
              <line x1="9" y1="13.4" x2="9" y2="15.4" />
              <line x1="2.6" y1="9" x2="4.6" y2="9" />
              <line x1="13.4" y1="9" x2="15.4" y2="9" />
              <line x1="4.5" y1="4.5" x2="5.9" y2="5.9" />
              <line x1="12.1" y1="12.1" x2="13.5" y2="13.5" />
              <line x1="13.5" y1="4.5" x2="12.1" y2="5.9" />
              <line x1="5.9" y1="12.1" x2="4.5" y2="13.5" />
            </g>
          </g>
        )}
        {kind === "assets" && (
          <g stroke="#5A3D2B" strokeWidth="1.4" strokeLinejoin="round">
            <path
              d="M6 4.2h6l2 3.4c.6 3.4-1 6-3 6.2-2 .2-3.6-2.8-3-6.2z"
              fill="#C9A86A"
            />
            <rect x="5.4" y="2.6" width="7.2" height="2" rx="1" fill="#5A3D2B" stroke="none" />
            <circle cx="9" cy="10.6" r="2.2" fill="#FFD873" />
            <text
              x="9"
              y="12"
              textAnchor="middle"
              fontSize="2.6"
              fontWeight="bold"
              fill="#5A3D2B"
              stroke="none"
              fontFamily="serif"
            >
              W
            </text>
          </g>
        )}
      </svg>
    </span>
  );
}

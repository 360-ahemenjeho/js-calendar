import { Box } from "@mui/material";
import { useState } from "react";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isEventOnDay,
} from "../../../helpers/date";
import { getColorFromText } from "../../../helpers/color";
import NavButton from "./NavButton";

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const today = new Date();

const SAMPLE_EVENTS = [
  {
    title: "Meeting with Team",
    start: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}T10:00`,
    end: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}T11:00`,
  },
  {
    title: "Multi-day Conference",
    start: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}T09:00`,
    end: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate() + 2).padStart(2, "0")}T17:00`,
  },
];

export default function Calendar() {
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const { year, month } = current;
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);

  const calendarDays: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  const goToPrev = () =>
    setCurrent(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 },
    );

  const goToNext = () =>
    setCurrent(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 },
    );

  const goToToday = () =>
    setCurrent({ year: today.getFullYear(), month: today.getMonth() });

  const isToday = (day: number | null) =>
    day !== null &&
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <Box
      sx={{
        fontFamily: `Inter, sans-serif`,
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: { xs: "12px", sm: "14px" },
        }}
      >
        {/* Month + Year */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
          <Box
            component="span"
            sx={{
              fontSize: { xs: "18px", sm: "20px" },
              fontWeight: 700,
              color: "#1c1c1e",
              letterSpacing: "-0.4px",
            }}
          >
            {MONTH_NAMES[month]}
          </Box>
          <Box
            component="span"
            sx={{
              fontSize: { xs: "18px", sm: "20px" },
              fontWeight: 300,
              color: "#8e8e93",
              letterSpacing: "-0.4px",
            }}
          >
            {year}
          </Box>
        </Box>

        {/* Controls */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <NavButton onClick={goToPrev}>‹</NavButton>
          <Box
            component="button"
            onClick={goToToday}
            sx={{
              fontFamily: "inherit",
              fontSize: "13px",
              fontWeight: 500,
              color: "#007aff",
              background: "none",
              backgroundColor: "rgba(0,0,0,0.06)",
              borderRadius: "999px",
              px: "11px",
              height: "30px",
              cursor: "pointer",
              transition: "background-color 0.15s",
              outline: "none",
              border: "none",
              "&:hover": {
                backgroundColor: "rgba(0,122,255,0.06)",
              },
            }}
          >
            Today
          </Box>
          <NavButton onClick={goToNext}>›</NavButton>
        </Box>
      </Box>

      {/* ── Grid ── */}
      <Box sx={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <Box
          component="table"
          sx={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: { xs: "420px", sm: "100%" },
            tableLayout: "fixed",
            fontFamily: "inherit",

            "& th, & td": {
              padding: 0,
              fontFamily: "inherit",
              verticalAlign: "top",
            },

            // Thin vertical dividers between columns
            "& td + td": {
              borderLeft: "1px solid rgba(0,0,0,0.05)",
            },

            // Thin horizontal divider between rows
            "& tbody tr + tr td": {
              borderTop: "1px solid rgba(0,0,0,0.05)",
            },
          }}
        >
          {/* Day-of-week header row */}
          <Box component="thead">
            <Box component="tr">
              {DAYS_SHORT.map((day, i) => {
                const isWeekend = i === 0 || i === 6;
                return (
                  <Box
                    key={day}
                    component="th"
                    sx={{
                      py: "9px",
                      textAlign: "center",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: isWeekend ? "#c7c7cc" : "#aeaeb2",
                      borderBottom: "1px solid rgba(0,0,0,0.07)",
                    }}
                  >
                    {day}
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box component="tbody">
            {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map(
              (_, weekIndex) => (
                <Box component="tr" key={weekIndex}>
                  {calendarDays
                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                    .map((day, dayIndex) => {
                      const isWeekend = dayIndex === 0 || dayIndex === 6;
                      const isTodayCell = isToday(day);
                      const dayEvents = SAMPLE_EVENTS.filter((event) =>
                        isEventOnDay(event, year, month, day as number),
                      );

                      return (
                        <Box
                          component="td"
                          key={dayIndex}
                          sx={{
                            height: { xs: "72px", sm: "104px" },
                            backgroundColor: isWeekend
                              ? "rgba(0,0,0,0.012)"
                              : "transparent",
                            transition: "background 0.1s",
                            cursor: day ? "pointer" : "default",
                            "&:hover": day
                              ? {
                                  backgroundColor: isWeekend
                                    ? "rgba(0,0,0,0.03)"
                                    : "rgba(0,122,255,0.025)",
                                }
                              : {},
                          }}
                        >
                          <Box
                            sx={{
                              px: { xs: "5px", sm: "9px" },
                              pt: { xs: "5px", sm: "7px" },
                              pb: "4px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                              height: "100%",
                              boxSizing: "border-box",
                            }}
                          >
                            {/* Date number */}
                            {day && (
                              <Box
                                sx={{
                                  width: { xs: "22px", sm: "26px" },
                                  height: { xs: "22px", sm: "26px" },
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  alignSelf: "flex-start",
                                  fontSize: { xs: "12px", sm: "13px" },
                                  fontWeight: isTodayCell ? 700 : 400,
                                  letterSpacing: "-0.2px",
                                  color: isTodayCell
                                    ? "#fff"
                                    : isWeekend
                                      ? "#c7c7cc"
                                      : "#1c1c1e",
                                  backgroundColor: isTodayCell
                                    ? "#ff3b30"
                                    : "transparent",
                                  flexShrink: 0,
                                  lineHeight: 1,
                                }}
                              >
                                {day}
                              </Box>
                            )}

                            {/* Event pills */}
                            {dayEvents.length > 0 && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                  overflow: "hidden",
                                  flex: 1,
                                }}
                              >
                                {dayEvents.map((event, index) => {
                                  const { base } = getColorFromText(
                                    event.title,
                                  );
                                  return (
                                    <Box
                                      key={index}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        borderRadius: "4px",
                                        px: "5px",
                                        py: "2px",
                                        backgroundColor: `${base}1a`,
                                        overflow: "hidden",
                                        transition: "background 0.12s",
                                        "&:hover": {
                                          backgroundColor: `${base}2e`,
                                        },
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: "6px",
                                          height: "6px",
                                          borderRadius: "50%",
                                          backgroundColor: base,
                                          flexShrink: 0,
                                        }}
                                      />
                                      <Box
                                        sx={{
                                          fontSize: { xs: "10px", sm: "11px" },
                                          fontWeight: 500,
                                          color: "#1c1c1e",
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          lineHeight: "16px",
                                        }}
                                      >
                                        {event.title}
                                      </Box>
                                    </Box>
                                  );
                                })}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              ),
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

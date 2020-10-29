#!/usr/bin/gnuplot
#
# Plotting a heat map on Gnuplots world.dat
#
# AUTHOR: Hagen Wierstorf

reset

set terminal png size 600,400 enhanced font 'Verdana,10'
set output 'aqimap.png'

unset xtics
unset ytics
unset key

set xrange [-179:179]
set yrange [-89:89]

# color definitions
set border lw 1.5
set style line 1 lc rgb 'black' lt 1 lw 2

set rmargin screen 0.85

set tics scale 0.5
set format '%g'

set cbrange [-1:501]
set palette defined (\
    0 "#FFFFFF",\
    1 "#FFFFFF",\
    50 "#00DD00",\
    100 "#FFFF00",\
    150 "#FFCC00",\
    200 "#FF0000",\
    300 "#FF00FF",\
    500 "#000000")

plot '.aqimap.dat' u 2:1:3 with image,\
     'world.dat' with lines linestyle 1



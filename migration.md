# v0.13.26 to v0.13.27
### TimeToEvent 을 Rechart 로 변경
- TimeToEvent 의 Data 형태가 변경되어 기존 Data 형태로 이용 시 TimeToEventOld 을 사용하면 된다

# v0.13.25 to v0.13.26
### RadarChart 을 Rechart 로 변경
- RadarChart 의 Data 형태가 변경되어 기존 Data 형태로 이용 시 RadarChartOld 을 사용하면 된다

# v0.13.20 to v0.13.21

### theme 에서 blue, green, compare, Themes.ThemeArrangeGradient 를 변경

**blue, green, compare, Themes.ThemeArrangeGradient 삭제 예정**

- blue -> Themes.ThemeArrangePrimarySea
- green -> Themes.ThemeArrangeSecondaryTeal
- compare -> Themes.ThemeCompareSecondaryTeal
- Themes.ThemeArrangeGradient -> Themes.ThemeArrangeGradientPrimarySea

### PieChart 의 colorList property 삭졔 예정

- colorList 대신 theme 를 사용


# to v0.13.23

### barChart 의 fontSize 가 증가 됨에 따라, XAxix 의 domain 범위가 큰 경우, margin-right 를 지정해주어야 함